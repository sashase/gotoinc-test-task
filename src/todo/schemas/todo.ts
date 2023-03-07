import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;

  @ApiProperty({
    example: 'cook a dinner',
    description: 'text',
  })
  text: string;

  @ApiProperty({
    example: false,
    description: 'isCompleted',
  })
  isCompleted: boolean;

  @ApiProperty({
    example: '2023-03-06T14:45:28.691Z',
    description: 'create date',
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-03-06T14:45:28.691Z',
    description: 'update date',
  })
  updatedAt: string;

  @ApiProperty({
    example: 1,
    description: 'id of creator',
  })
  userId: number;
}
