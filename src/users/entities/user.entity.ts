import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsHexadecimal, IsInt, IsPositive, IsString, Length } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true,
  })
  @IsInt()
  @IsPositive()
  @ApiProperty()
  public readonly id: number

  @Column({
    unique: true
  })
  @Length(3, 20)
  @IsString()
  @ApiProperty()
  public readonly email: string

  @Column()
  @Length(2, 10)
  @IsString()
  @ApiProperty()
  public readonly name: string

  @Column({
    select: false
  })
  @IsString()
  @IsHexadecimal()
  @Length(128, 128)
  @ApiProperty()
  public readonly password: string

  @Column({
    select: false
  })
  @IsString()
  @Length(8, 8)
  @ApiProperty()
  public readonly salt: string

  @CreateDateColumn({
    name: 'createdat',
    type: 'timestamp'
  })
  @IsDate()
  @ApiProperty()
  public readonly createdAt: Date
}