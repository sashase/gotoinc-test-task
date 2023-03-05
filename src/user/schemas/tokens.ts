import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksInVzZXJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzgwMjIwOTQsImV4cCI6MTY3ODAyMjk5NH0.cpSMhf1JCPrQZdOCTNlytXGj4jzmzykvrr_sCKl3dLM',
    description: 'Your access token, expires in 15 minutes',
  })
  access_token: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksInVzZXJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzgwMjIwOTQsImV4cCI6MTY3ODYyNjg5NH0.jLexccfHDhC5g_9_9aFgkZbv8vzli-_K3IkGjB-JruA',
    description: 'Your refresh token, expires in a week',
  })
  refresh_token: string;
}
