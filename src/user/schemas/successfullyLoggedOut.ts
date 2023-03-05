import { ApiProperty } from "@nestjs/swagger";

export class SuccessfullyLoggedOut {
  @ApiProperty({
    example: 200,
    description: 'Response code',
  })
  statusCode: number;

  @ApiProperty({
    example: "Successfully logged out",
    description: 'Response message',
  })
  message: string;
}
