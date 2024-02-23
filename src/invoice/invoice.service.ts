import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreatInvoiceDTO } from './dtos/createInvoice.dto';
import { IUpdateInvoiceDTO } from './dtos/updateInvoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}
  async getInvoices(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({ order: { id: 'DESC' } });
  }
  getInvoice(id: number): Promise<Invoice> {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: ['items', 'user'],
    });
  }

  async createInvoice(invoice): Promise<Invoice[]> {
    return this.invoiceRepository.create(invoice);
  }

  async updateInvoice(id: number, invoice): Promise<UpdateResult> {
    return await this.invoiceRepository.update(id, invoice);
  }

  async deleteInvoice(id: number): Promise<DeleteResult> {
    return await this.invoiceRepository.delete(id);
  }
}
