import { ApiProperty } from '@nestjs/swagger';

export class Forbidden {
  @ApiProperty({
    example: 403,
    description: 'Error code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'There are still some todos assigned to this group',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Forbidden',
    description: 'Error name',
  })
  error: string;
}
