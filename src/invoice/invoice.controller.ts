import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatInvoiceDTO } from './dtos/createInvoice.dto';
import { IUpdateInvoiceDTO } from './dtos/updateInvoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getInvoice(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.getInvoice(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  createInvoice(@Body() invoice: CreatInvoiceDTO): Promise<Invoice> {
    return this.invoiceService.createInvoice(invoice);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  updateInvoice(
    @Param('id', ParseIntPipe) id: string,
    @Body() invoice: IUpdateInvoiceDTO,
  ): Promise<UpdateResult> {
    return this.invoiceService.updateInvoice(id, invoice);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteInvoice(@Param('id', ParseIntPipe) id: string): Promise<DeleteResult> {
    return this.invoiceService.deleteInvoice(id);
  }
}
