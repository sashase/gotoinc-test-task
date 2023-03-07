import { ApiProperty } from '@nestjs/swagger';

export class NotFound {
  @ApiProperty({
    example: 404,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Not Found',
    description: 'Error message',
  })
  message: string;
}
