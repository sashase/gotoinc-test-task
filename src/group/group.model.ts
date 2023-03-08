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

@Table({ tableName: 'groups' })
export class Group extends Model<Group> {
  @ApiProperty({ example: 1, description: 'Group id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'main group', description: 'Group name' })
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'id of the user who created the group',
  })
  @ForeignKey(() => User)
  @Column({
    field: 'userId',
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;
}
