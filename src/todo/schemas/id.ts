import { ApiProperty } from '@nestjs/swagger';

export class Id {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;
}
