import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';
import { GetItemsFilterDto } from './dto/get-items.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private taskService: ItemsService) {}
  @Get()
  getTasks(@Query() filterDto: GetItemsFilterDto): Item[] {
    if (Object.keys(filterDto).length) {
      console.log('XXX');

      return this.taskService.getItemsWithFilters(filterDto);
    }
    return this.taskService.getAllItems();
  }
  @Post()
  createTask(@Body() CreateTaskDto: CreateItemDto): Item {
    return this.taskService.createItem(CreateTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Item {
    return this.taskService.getItemById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Item {
    return this.taskService.deleteItemById(id);
  }

  @Put(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateItemDto: updateItemDto,
  ): Item {
    return this.taskService.updateItemById(id, updateItemDto);
  }
}
