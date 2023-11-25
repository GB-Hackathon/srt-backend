import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, MinLength } from 'class-validator'

export class CreateUserDto {
  @Length(5, 30)
  @IsString()
  @ApiProperty()
  public readonly email: string

  @Length(2, 10)
  @IsString()
  @ApiProperty()
  public readonly name: string

  @MinLength(8)
  @IsString()
  @ApiProperty()
  public readonly password: string

  @IsString()
  @ApiProperty()
  public readonly tel: string
}