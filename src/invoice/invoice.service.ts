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
  getInvoice(id: string): Promise<Invoice> {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: ['items', 'user'],
    });
  }

  async createInvoice(invoice: CreatInvoiceDTO): Promise<Invoice> {
    const { items, user } = invoice;
    const invoiceToCreate = {
      items: items.map((item) => ({ id: item.id })),
      user: { id: user },
    };
    return this.invoiceRepository.save(invoiceToCreate);
  }

  async updateInvoice(id: string, invoice): Promise<UpdateResult> {
    return await this.invoiceRepository.update(id, invoice);
  }

  async deleteInvoice(id: string): Promise<DeleteResult> {
    return await this.invoiceRepository.delete(id);
  }
}
