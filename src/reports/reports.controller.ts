import { Body, Controller, Get, NotFoundException, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ReportsService } from './reports.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateReportDto } from './dto/CreateReportDto'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import { Response } from 'express'

@ApiTags('reports')
@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor (
    private reportsService: ReportsService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async createReport(@Res({ passthrough: true }) res: Response, @UploadedFile() image: Express.Multer.File, @Body() createReportDto: CreateReportDto) {
    const userId = res.locals.userId
    await this.reportsService.createReport(userId, image, createReportDto)

    return {
      success: true
    }
  }

  @Get()
  public async findAllReport() {
    const reports = await this.reportsService.findAllReport()

    return {
      success: true,
      body: reports
    }
  }

  @Get(':reportId')
  public async findReport(@Param('reportId') reportId: number) {
    const report = await this.reportsService.findReport(reportId)

    if (report === undefined) {
      throw new NotFoundException({
        success: false,
        message: 'Report not found.'
      })
    }

    return {
      success: true,
      body: report
    }
  }
}