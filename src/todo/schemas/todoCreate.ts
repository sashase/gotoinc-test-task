import { ApiProperty } from '@nestjs/swagger';

export class TodoCreate {
  @ApiProperty({
    example: 'cook a dinner',
    description: 'text',
  })
  text: string;
}
