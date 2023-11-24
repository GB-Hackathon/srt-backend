import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateMarkerDto {
  @IsString()
  @ApiProperty()
  public readonly type: string

  @IsString()
  @ApiProperty()
  public readonly latitude: string

  @IsString()
  @ApiProperty()
  public readonly longitude: string

  @IsString()
  @ApiProperty()
  public readonly reportId: string
}