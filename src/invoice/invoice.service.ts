import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreatInvoiceDTO } from './dtos/createInvoice.dto';
import { Item } from '../items/item.entity'; // Assuming you have an Item entity
import { User } from '../user/user.entity'; // Assuming you have a User entity

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Item) // Make sure to inject repositories for Item and User as well
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getInvoices(
    userId: string,
    page: number,
    limit: number,
  ): Promise<[Invoice[], number]> {
    const findOptions = {
      relations: ['items', 'user'],
      skip: (page - 1) * limit,
      take: limit,
    };

    if (userId) {
      findOptions['where'] = { user: { id: userId } }; // Filter by userId
    }
    const [data, totalCount] =
      await this.invoiceRepository.findAndCount(findOptions);
    return [data, totalCount];
  }

  getInvoice(id: string): Promise<Invoice> {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: ['items', 'user'],
    });
  }

  async createInvoice(createInvoiceDto: CreatInvoiceDTO): Promise<Invoice> {
    const { items, user } = createInvoiceDto;

    // Load the user entity based on the provided user ID
    const userEntity = await this.userRepository.findOneBy({ id: user });
    if (!userEntity) {
      throw new Error('User not found');
    }

    // Load item entities based on the provided item IDs
    const itemEntities = await Promise.all(
      items.map((itemId) => this.itemRepository.findOneBy({ id: itemId.id })),
    );

    // Filter out any null values in case some items weren't found
    const validItemEntities = itemEntities.filter((item) => item !== null);

    // Create the invoice with the loaded user and items
    const invoice = this.invoiceRepository.create({
      user: userEntity,
      items: validItemEntities,
    });

    return this.invoiceRepository.save(invoice);
  }
  async updateInvoice(id: string, invoice): Promise<UpdateResult> {
    return await this.invoiceRepository.update(id, invoice);
  }

  async deleteInvoice(id: string): Promise<DeleteResult> {
    return await this.invoiceRepository.delete(id);
  }
}
