// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Invoice } from '../invoice/invoice.entity';
import { Item } from '../items/item.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'myuser',
  password: 'mypassword',
  database: 'mydb',
  entities: [User, Invoice, Item],
  synchronize: true,
  migrations: [__dirname + '/../migrations/**/*.ts'],
};
