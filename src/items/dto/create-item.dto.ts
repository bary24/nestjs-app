import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateItemDto {
  @IsNumber()
  quantity: number;
  @Length(10, 50)
  price: number;
}
