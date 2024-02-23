import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './items.model';
import { v4 as generateId } from 'uuid';
import { CreateItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';
import { GetItemsFilterDto } from './dto/get-items.dto';
@Injectable()
export class ItemsService {
  private items: Item[] = [];
  getAllItems(): Item[] {
    return this.items;
  }

  getItemsWithFilters(filterDto: GetItemsFilterDto): Item[] {
    const { price, quantity } = filterDto;
    let items;
    if (price) {
      items = this.items.filter((task) => task.price === price);
    }

    if (quantity) {
      console.log('YESS');

      items = this.items.filter((task) => {
        return task.price === price;
      });
    }
    return items;
  }

  createItem(CreateItemDto: CreateItemDto): Item {
    const { quantity, price } = CreateItemDto;
    const item: Item = {
      id: generateId(),
      price,
      quantity,
    };
    this.items.push(item);
    return item;
  }

  getItemById(id: string): Item {
    const task = this.items.find((task) => task.id === id);

    if (task) {
      return task;
    } else {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }

  deleteItemById(id: string): Item {
    const taskIndex = this.items.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException();
    }
    const task = this.items[taskIndex];
    this.items.splice(taskIndex, 1);
    return task;
  }

  updateItemById(id: string, updateItemstatusDto: updateItemDto): Item {
    const { quantity, price } = updateItemstatusDto;
    const taskToUpdateIndex = this.items.findIndex((item) => item.id === id);
    this.items[taskToUpdateIndex].quantity = quantity;
    return this.items[taskToUpdateIndex];
  }
}
