import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from '../todo/todo.model';
import { GroupController } from './group.controller';
import { Group } from './group.model';
import { GroupService } from './group.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Group]),
    SequelizeModule.forFeature([Todo]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
