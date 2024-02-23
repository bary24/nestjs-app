import { Item } from '../../items/items.model';
import { IsArray, IsNumber } from 'class-validator';

export class CreatInvoiceDTO {
  @IsArray()
  items: Item[];
  @IsNumber()
  user: string;
}
