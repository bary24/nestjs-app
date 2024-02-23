import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';
import { Item } from './items/entities/item.entity';

@Module({
  imports: [
    ItemsModule,
    InvoiceModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: 'localhost', // Database host
      port: 3306, // Port number
      username: 'myuser', // MySQL user
      password: 'mypassword', // MySQL password
      database: 'mydb', // Database name
      entities: [Item],
      synchronize: true, // Set to false in production
    }),
  ],
})
export class AppModule {}
