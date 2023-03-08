import { ApiProperty } from '@nestjs/swagger';

export class GroupUpdate {
  @ApiProperty({
    example: 'renamed group',
    description: 'Group name',
  })
  name: string;
}
