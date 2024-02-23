import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateItemDto {
  @IsNumber()
  quantity: number;
  @IsNumber()
  price: number;
}
