import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from '../todo/todo.model';
import { GroupDto } from './dto/group.dto';
import { Group } from './group.model';
import { DeletedResponse } from './types';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    @InjectModel(Todo) private todoRepository: typeof Todo,
  ) {}

  async create(dto: GroupDto, userId: number): Promise<Group> {
    try {
      return await this.groupRepository.create({
        name: dto.name,
        userId,
      });
    } catch (error) {
      if (error.errors[0].message)
        throw new UnprocessableEntityException(error?.errors[0].message);
      throw new UnprocessableEntityException();
    }
  }

  async findById(id: Object, userId: number): Promise<Group> {
    const group: Group = await this.groupRepository.findOne({
      where: { ...id, userId },
    });
    if (!group) throw new NotFoundException();
    return group;
  }

  async findAll(userId: number): Promise<Group[]> {
    const group: Group[] = await this.groupRepository.findAll({
      where: { userId },
    });
    if (!group[0]) throw new NotFoundException();
    return group;
  }

  async update(dto: GroupDto, id, userId: number): Promise<Group> {
    const changed = await this.groupRepository.update(
      { name: dto.name },
      { where: { ...id, userId } },
    );
    if (!changed[0]) throw new NotFoundException();
    const group: Group = await this.groupRepository.findOne({ where: id });
    return group;
  }

  async delete(id, userId: number): Promise<DeletedResponse> {
    const group = await this.groupRepository.findOne({
      where: { ...id, userId },
    });
    if (!group) throw new NotFoundException();

    const hasTodos = await this.todoRepository.findAll({
      where: { groupName: group.name, userId },
    });
    if (hasTodos[0])
      throw new ForbiddenException(
        'There are still some todos assigned to this group',
      );

    const destroyed = await this.groupRepository.destroy({
      where: { ...id, userId },
    });
    return { statusCode: 200, message: 'Successfully deleted' };
  }
}
