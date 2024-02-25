import { Item } from '../../items/item.entity';
import { IsArray, IsString } from 'class-validator';

export class CreatInvoiceDTO {
  @IsArray()
  items: Item[];
  @IsString()
  user: string;
}
