import { Item } from '../../items/items.model';
import { IsArray, IsString } from 'class-validator';

export class CreatInvoiceDTO {
  @IsArray()
  items: Item[];
  @IsString()
  user: string;
}
