import { Item } from '../../items/item.entity';
import { IsArray, IsString } from 'class-validator';

export class CreatInvoiceDTO {
  @IsArray()
  items: string[];
  @IsString()
  user: string;
  status: string;
}
