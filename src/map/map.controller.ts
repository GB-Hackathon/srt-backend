import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common'
import { MapService } from './map.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { CreateMarkerDto } from './dto/CreateMarkerDto'

@ApiTags('map')
@UseGuards(AuthGuard)
@Controller('map')
export class MapController {
  constructor(
    private mapService: MapService
  ) { }

  @Post()
  public async createMarker(@Body() createMarkerDto: CreateMarkerDto) {
    await this.mapService.createMarker(createMarkerDto)

    return {
      success: true
    }
  }

  @Get()
  public async findAllMarker() {
    const markers = await this.mapService.findAllMarker()

    return {
      success: true,
      body: markers
    }
  }

  @Get(':markerId')
  public async findUser(@Param('markerId') markerId: number) {
    const marker = await this.mapService.findMarker(markerId)

    if (marker === undefined) {
      throw new NotFoundException({
        success: false,
        message: 'Marker not found.'
      })
    }

    return {
      success: true,
      body: marker
    }
  }
}