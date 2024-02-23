import { Item } from '../../items/items.model';

export class CreatInvoiceDTO {
  items: Item[];
  user: number;
}
