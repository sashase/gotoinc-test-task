import { ApiProperty } from '@nestjs/swagger';

export class GroupAlreadyExists {
  @ApiProperty({
    example: 422,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'name must be unique',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Unprocessable Entity',
    description: 'Error name',
  })
  error: string;
}
