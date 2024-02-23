import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [TasksController],
  providers: [ItemsService],
})
export class ItemsModule {}
