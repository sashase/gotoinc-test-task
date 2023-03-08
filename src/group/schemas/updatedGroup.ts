import { ApiProperty } from '@nestjs/swagger';

export class UpdatedGroup {
  @ApiProperty({
    example: 1,
    description: 'Group id',
  })
  id: number;

  @ApiProperty({
    example: 'renamed group',
    description: 'Group name',
  })
  name: string;

  @ApiProperty({
    example: 3,
    description: 'User id',
  })
  userId: number;

  @ApiProperty({
    example: '2023-03-07T13:21:12.176Z',
    description: 'updatedAt',
  })
  updatedAt: string;

  @ApiProperty({
    example: '2023-03-07T11:44:35.116Z',
    description: 'createdAt',
  })
  createdAt: string;
}
