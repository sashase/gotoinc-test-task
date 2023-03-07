import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDto, UpdateDto } from './dto';
import { Todo } from './todo.model';
import { DeletedResponse } from './types';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}

  async create(dto: CreateDto, userId: number): Promise<Todo> {
    const todo: Todo = await this.todoRepository.create({
      text: dto.text,
      userId,
    });
    if (!todo) throw new NotFoundException();
    return todo;
  }

  async findById(id: Object, userId: number): Promise<Todo> {
    const todo: Todo = await this.todoRepository.findOne({
      where: { ...id, userId },
    });
    if (!todo) throw new NotFoundException();
    return todo;
  }

  async findAll(userId: number): Promise<Todo[]> {
    const todo: Todo[] = await this.todoRepository.findAll({
      where: { userId },
    });
    if (!todo) throw new NotFoundException();
    return todo;
  }

  async update(dto: UpdateDto, id, userId: number): Promise<Todo> {
    const changed = await this.todoRepository.update(
      { text: dto.text, isCompleted: dto.isCompleted },
      { where: { ...id, userId } },
    );
    if (!changed[0]) throw new NotFoundException();
    const todo: Todo = await this.todoRepository.findOne({ where: id });
    return todo;
  }

  async delete(id, userId: number): Promise<DeletedResponse> {
    const destroyed = await this.todoRepository.destroy({
      where: { ...id, userId },
    });
    if (!destroyed) throw new NotFoundException();
    return { statusCode: 200, message: 'Successfully deleted' };
  }
}
