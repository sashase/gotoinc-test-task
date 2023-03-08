import { ApiProperty } from '@nestjs/swagger';

export class GroupCreate {
  @ApiProperty({
    example: 'main group',
    description: 'Group name',
  })
  name: string;
}
