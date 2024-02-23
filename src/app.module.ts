import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ItemsModule, InvoiceModule, UserModule],
})
export class AppModule {}
