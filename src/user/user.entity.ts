import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string' })
  username: string;

  @Column({ type: 'string' })
  password: string;

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  @JoinColumn()
  invoices: Invoice[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
