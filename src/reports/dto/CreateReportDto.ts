import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateReportDto {
  @IsString()
  @ApiProperty()
  public readonly type: string

  @IsString()
  @ApiProperty()
  public readonly title: string

  @IsString()
  @ApiProperty()
  public readonly content: string

  @IsString()
  @ApiProperty()
  public readonly location: string

  @IsString()
  @ApiProperty()
  public readonly date: string
}