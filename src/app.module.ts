import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';
import { Item } from './items/entities/item.entity';
import { User } from './user/user.entity';
import { Invoice } from './invoice/invoice.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ItemsModule,
    InvoiceModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
      load: [typeorm],
    }),

    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: 'localhost', // Database host
      port: 3306, // Port number
      username: 'myuser', // MySQL user
      password: 'mypassword', // MySQL password
      database: 'mydb', // Database name
      entities: [Item, User, Invoice],
      synchronize: true, // Set to false in production
      migrations: ['migrations/*.ts'],
    }),
    AuthenticationModule,
  ],
})
export class AppModule {}
