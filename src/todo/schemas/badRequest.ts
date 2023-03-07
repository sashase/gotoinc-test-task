import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({
    example: 400,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: ['text should not be empty', 'text must be a string'],
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Error name',
  })
  error: string;
}
