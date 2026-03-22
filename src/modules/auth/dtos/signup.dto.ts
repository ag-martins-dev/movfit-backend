import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, MinLength } from 'class-validator';

export class SignupInputDto {
  @ApiProperty({ type: 'string', required: true })
  @IsString({ message: 'Invalid name.' })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
    uniqueItems: true,
    required: true,
  })
  @IsEmail(undefined, { message: 'Invalid email.' })
  email: string;

  @ApiProperty({
    type: 'string',
    format: 'password',
    minLength: 8,
    required: true,
  })
  @IsString({ message: 'Invalid password.' })
  @MinLength(8, { message: 'Password too short.' })
  password: string;

  @ApiProperty({ type: 'string', format: 'date', required: true })
  @IsDate({ message: 'Invalid birthdate.' })
  @Type(() => Date)
  birthDate: Date;
}

export class SignupOutputDto {
  @ApiProperty({
    type: 'string',
    format: 'password',
    uniqueItems: true,
    required: true,
  })
  accessToken: string;
}
