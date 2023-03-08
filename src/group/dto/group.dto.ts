import { IsNotEmpty, IsString } from 'class-validator';

export class GroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
