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

  // Use 'varchar' instead of 'string'
  @Column({ type: 'varchar' })
  name: string;

  // Use 'varchar' instead of 'string'
  @Column({ type: 'varchar' })
  username: string;

  // Use 'varchar' instead of 'string'
  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  @JoinColumn()
  invoices: Invoice[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
