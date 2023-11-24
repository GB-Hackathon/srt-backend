import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'reports'
})
export class Report {
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
  @IsString()
  @ApiProperty()
  public readonly image: string

  @Column()
  @IsString()
  @ApiProperty()
  public readonly title: string

  @Column()
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  public readonly content: string

  @Column()
  @IsString()
  @ApiProperty()
  public readonly location: string

  @Column()
  @IsString()
  @ApiProperty()
  public readonly date: string

  @Column()
  @IsInt()
  @ApiProperty()
  public readonly userId: number

  @CreateDateColumn({
    name: 'createdat',
    type: 'timestamp'
  })
  @IsDate()
  @ApiProperty()
  public readonly createdAt: Date
}