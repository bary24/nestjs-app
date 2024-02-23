import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}
  async findAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
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

  getItemById(id: FindOneOptions): Promise<Item> {
    const task = this.itemRepository.findOne(id);

    if (task) {
      return task;
    } else {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }

  async deleteItem(id: string): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Item with ID ${id} not found.`);
    }
  }
}
