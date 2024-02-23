import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity'; // Make sure to import your Invoice entity
import { User } from '../user/user.entity';
import { Item } from '../items/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Item, User])], // Add this line
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
