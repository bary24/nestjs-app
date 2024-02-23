import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class GetItemsFilterDto {
  quantity?: number;
  @IsOptional()
  @IsString()
  price?: number;
}
