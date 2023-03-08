import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UsersModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { GroupModule } from './group/group.module';
import { Todo } from './todo/todo.model';
import { Group } from './group/group.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Todo, Group],
      autoLoadModels: true,
    }),
    UsersModule,
    TodoModule,
    GroupModule,
  ],
})
export class AppModule {}
