import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
  @Length(5, 30)
  @IsString()
  @ApiProperty()
  public readonly email: string

  @IsString()
  @ApiProperty()
  public readonly tel: string
}