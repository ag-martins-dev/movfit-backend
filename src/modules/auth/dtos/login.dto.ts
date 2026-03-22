import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginInputDto {
  @ApiProperty({
    type: 'string',
    format: 'email',
    uniqueItems: true,
    required: true,
  })
  @IsEmail(undefined, { message: 'Email invalid.' })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    format: 'password',
    minLength: 8,
    required: true,
  })
  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'Password need to be greater than or equal 8.' })
  readonly password: string;
}

export class LoginOutputDto {
  @ApiProperty({
    type: 'string',
    format: 'password',
    uniqueItems: true,
    required: true,
  })
  accessToken: string;
}
