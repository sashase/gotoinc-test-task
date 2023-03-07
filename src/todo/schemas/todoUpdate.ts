import { ApiProperty } from '@nestjs/swagger';

export class TodoUpdate {
  @ApiProperty({
    example: 'make a breakfast',
    description: 'text',
  })
  text: string;

  @ApiProperty({
    example: true,
    description: 'isCompleted',
  })
  isCompleted: boolean;
}
