import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';
import { FindOneOptions } from 'typeorm';

@Controller('/items')
export class TasksController {
  constructor(private taskService: ItemsService) {}
  @Get()
  getTasks(): Promise<Item[]> {
    return this.taskService.findAllItems();
  }
  @Post()
  createTask(@Body() CreateTaskDto: CreateItemDto): Promise<Item> {
    return this.taskService.createItem(CreateTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: FindOneOptions): Promise<Item> {
    return this.taskService.getItemById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteItem(id);
  }

  @Put(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateItemDto: updateItemDto,
  ): Promise<Item> {
    return this.taskService.updateItem(id, updateItemDto);
  }
}
