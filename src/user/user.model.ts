import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({ example: 1, description: 'user id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'johndoe', description: 'username' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({
    example:
      '$argon2id$v=19$m=65536,t=3,p=4$AGgo9Cmq5P6AvBdDAadssg$11IJILXwj6qbRoC+XPC3jlxE836wvjFV9kDj9WcloIg',
    description: 'hashed user password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash: string;

  @ApiProperty({
    example:
      '$argon2id$v=19$m=65536,t=3,p=4$AwWo9CwdjFV99WcloIgNvB8fthwkDjWg$11IJILXwj6qmabRoC+XPC3jlxE836wv',
    description: 'hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  rtHash: string;
}
