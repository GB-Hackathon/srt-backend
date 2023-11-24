import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Map } from './entities/map.entity'
import { CreateMarkerDto } from './dto/CreateMarkerDto'

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map)
    private readonly maps: Repository<Map>
  ) { }

  public async createMarker(createMarkerDto: CreateMarkerDto): Promise<void> {
    await this.maps.insert({
      type: createMarkerDto.type,
      latitude: parseFloat(createMarkerDto.latitude),
      longitude: parseFloat(createMarkerDto.longitude),
      reportId: parseInt(createMarkerDto.reportId)
    })
  }

  public async findAllMarker(): Promise<Map[]> {
    return await this.maps.find()
  }

  public async findMarker(id: number): Promise<Map | undefined> {
    return await this.maps.findOne({
      where: { id }
    }) ?? undefined
  }
}