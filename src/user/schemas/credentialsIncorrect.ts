import { ApiProperty } from '@nestjs/swagger';

export class CredentialsIncorrect {
  @ApiProperty({
    example: 401,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Credentials incorrect',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error name',
  })
  error: string;
}
