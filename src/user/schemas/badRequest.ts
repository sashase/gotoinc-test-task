import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({
    example: 400,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: [
      'username should not be empty',
      'username must be a string',
      'password should not be empty',
      'password must be a string',
    ],
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Error name',
  })
  error: string;
}
