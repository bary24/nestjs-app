import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { User } from '../user/user.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Item)
  @JoinColumn()
  items: Item[];

  @ManyToOne(() => User, (user) => user.invoices)
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
