import { ApiProperty } from '@nestjs/swagger';

export class UserAlreadyExists {
  @ApiProperty({
    example: 422,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'username must be unique',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Unprocessable Entity',
    description: 'Error name',
  })
  error: string;
}
