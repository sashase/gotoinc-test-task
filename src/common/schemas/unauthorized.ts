import { ApiProperty } from '@nestjs/swagger';

export class Unauthorized {
  @ApiProperty({
    example: 401,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error message',
  })
  message: string;
}
