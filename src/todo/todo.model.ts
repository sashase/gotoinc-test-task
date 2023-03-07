import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ tableName: 'todos' })
export class Todo extends Model<Todo> {
  @ApiProperty({ example: 1, description: 'TODO id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'cook a dinner', description: 'TODO text' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ApiProperty({ example: true, description: 'isCompleted' })
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isCompleted: boolean;

  @ApiProperty({
    example: 1,
    description: 'id of the user who created the task',
  })
  @ForeignKey(() => User)
  @Column({
    field: 'userId',
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;
}
