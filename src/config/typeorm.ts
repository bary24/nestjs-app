// src/config/typeorm.ts
import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { Invoice } from '../invoice/invoice.entity';
import { Item } from '../items/entities/item.entity';
const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'myuser',
  password: 'mypassword',
  database: 'mydb',
  entities: [User, Invoice, Item],
  synchronize: false, // Recommended to be false in production to avoid data loss
  migrations: [__dirname + '/../migrations/**/*.ts'], // Path to your migration files
  // Additional options as needed
});

console.log('Migration DB Config:', AppDataSource.options);

export default AppDataSource;
