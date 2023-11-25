import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Report } from './entities/report.entity'
import { CreateReportDto } from './dto/CreateReportDto'

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reports: Repository<Report>
  ) { }

  public async createReport(userId: number, image: Express.Multer.File, createReportDto: CreateReportDto): Promise<void> {
    await this.reports.insert({
      type: createReportDto.type,
      image: image.filename,
      title: createReportDto.title,
      content: createReportDto.content,
      location: createReportDto.location,
      date: createReportDto.date,
      userId: userId
    })
  }
  
  public async findAllReport(): Promise<Report[]> {
    return this.reports.find()
  }

  public async findReport(id: number): Promise<Report | undefined> {
    return await this.reports.findOne({
      where: { id }
    }) ?? undefined
  }

  public async findReportByUserId(userId: number): Promise<Report[]> {
    return await this.reports.find({
      where: { userId }
    })
  }
}