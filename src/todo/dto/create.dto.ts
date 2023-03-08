import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  groupName: string;
}
