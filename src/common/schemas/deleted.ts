import { ApiProperty } from '@nestjs/swagger';

export class Deleted {
  @ApiProperty({
    example: 200,
    description: 'Status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Successfully deleted',
    description: 'Message',
  })
  message: string;
}
