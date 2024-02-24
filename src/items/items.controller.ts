import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';
import { FindOneOptions } from 'typeorm';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('/items')
export class ItemsController {
  constructor(private ItemsService: ItemsService) {}
  @Get()
  async getItems(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const [data, totalCount] = await this.ItemsService.findAllItems(
      page,
      limit,
    );
    return {
      data,
      page,
      limit,
      totalCount,
    };
  }
  @Post()
  createTask(@Body() CreateTaskDto: CreateItemDto): Promise<Item> {
    return this.ItemsService.createItem(CreateTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: FindOneOptions): Promise<Item> {
    return this.ItemsService.getItemById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.ItemsService.deleteItem(id);
  }

  @Put(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateItemDto: updateItemDto,
  ): Promise<Item> {
    return this.ItemsService.updateItem(id, updateItemDto);
  }
}
