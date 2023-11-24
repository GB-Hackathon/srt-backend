import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'map'
})
export class Map {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true
  })
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public readonly id: number

  @Column()
  @IsString()
  @ApiProperty()
  public readonly type: string

  @Column()
  @IsNumber()
  @ApiProperty()
  public readonly latitude: number

  @Column()
  @IsNumber()
  @ApiProperty()
  public readonly longitude: number

  @Column()
  @IsInt()
  @ApiProperty()
  public readonly reportId: number
}