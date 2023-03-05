import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({
    example: 'JohnDoe',
    description: 'Username',
  })
  username: number;

  @ApiProperty({
    example: 'qwerty123',
    description: 'Password',
  })
  password: string;
}
