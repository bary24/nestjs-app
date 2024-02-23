import { Module } from '@nestjs/common';
import { TasksController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [TasksController],
  providers: [ItemsService],
})
export class ItemsModule {}
