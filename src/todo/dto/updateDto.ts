import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsOptional()
  text: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
