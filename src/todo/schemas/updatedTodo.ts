import { ApiProperty } from '@nestjs/swagger';

export class UpdatedTodo {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;

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

  @ApiProperty({
    example: '2023-03-06T14:45:28.691Z',
    description: 'create date',
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-03-07T12:40:13.451Z',
    description: 'update date',
  })
  updatedAt: string;

  @ApiProperty({
    example: 1,
    description: 'id of creator',
  })
  userId: number;
}
