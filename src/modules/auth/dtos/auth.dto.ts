import { ApiProperty } from '@nestjs/swagger/dist'

export class AuthResponseDTO {
  @ApiProperty({ title: 'Access token (JWT)', type: 'string' })
  accessToken: string
}
