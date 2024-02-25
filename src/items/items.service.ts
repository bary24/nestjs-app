import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}
  async findAllItems(page, limit): Promise<[Item[], number]> {
    const [data, totalCount] = await this.itemRepository.findAndCount({
      skip: (page - 1) * limit, // Calculate the offset
      take: limit,
    });

    return [data, totalCount];
  }

  async updateItem(id: string, updateItemDto: updateItemDto): Promise<Item> {
    const item = await this.itemRepository.preload({
      id: id,
      ...updateItemDto,
    });

    if (!item) {
      throw new Error(`Item with ID ${id} not found.`);
    }

    return this.itemRepository.save(item);
  }

  async createItem(CreateItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(CreateItemDto);
    return this.itemRepository.save(newItem);
  }

  async getItemById(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id: id } });

    if (item) {
      return item;
    } else {
      throw new NotFoundException(`item with id ${id} was not found`);
    }
  }

  async deleteItem(id: string): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Item with ID ${id} not found.`);
    }
  }
}
