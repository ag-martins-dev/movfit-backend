import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsStrongPassword } from 'class-validator'

export class SignupDTO {
  @ApiProperty({ type: 'string', required: true })
  @IsString()
  readonly name: string

  @ApiProperty({ type: 'string', format: 'email', required: true })
  @IsEmail({
    allow_underscores: true,
    domain_specific_validation: true,
  })
  readonly email: string

  @ApiProperty({ type: 'string', format: 'password', required: true })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  readonly password: string
}
