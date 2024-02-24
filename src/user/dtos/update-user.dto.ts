import { IsNotEmpty } from 'class-validator';
export class updateUserDto {
  @IsNotEmpty()
  name: string;
}
