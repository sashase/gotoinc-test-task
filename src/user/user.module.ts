import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AtStrategy, RtStrategy } from './strategies';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, AtStrategy, RtStrategy],
})
export class UsersModule {}
