import { Matches, Length } from 'class-validator';
import { Invoice } from 'src/invoice/invoice.entity';

Matches;
export class signupDto {
  username: string;
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  @Length(10, 20)
  password: string;
  name: string;
  invoices: Invoice[];
  created_at: Date;
}
