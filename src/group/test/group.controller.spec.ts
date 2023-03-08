import { Test } from '@nestjs/testing';
import { GroupDto } from '../dto/group.dto';
import { GroupController } from '../group.controller';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { DeletedResponse } from '../types';
import { deletedResponseStub, groupStub } from './stubs';

jest.mock('../group.service');

describe('GroupController', () => {
  let groupController: GroupController;
  let groupService: GroupService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [GroupService],
    }).compile();

    groupController = moduleRef.get<GroupController>(GroupController);
    groupService = moduleRef.get<GroupService>(GroupService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create is called', () => {
      const dto: GroupDto = { name: 'main group' };
      const userId: number = 1;
      let group: Group;

      beforeEach(async () => {
        group = await groupController.create(dto, userId);
      });

      test('then it should call groupService', () => {
        expect(groupService.create).toBeCalledWith(dto, userId);
      });

      test('then it should return todo', () => {
        expect(group).toEqual(groupStub);
      });
    });
  });

  describe('findById', () => {
    describe('when findById is called', () => {
      const id: number = 1;
      const userId: number = 1;
      let group: Group;

      beforeEach(async () => {
        group = await groupController.findById(id, userId);
      });

      test('then it should call groupService', () => {
        expect(groupService.findById).toBeCalledWith(id, userId);
      });

      test('then it should return group', () => {
        expect(group).toEqual(groupStub);
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      const userId: number = 1;
      let group: Group[];

      beforeEach(async () => {
        group = await groupController.findAll(userId);
      });

      test('then it should call groupService', () => {
        expect(groupService.findAll).toBeCalledWith(userId);
      });

      test('then it should return groups', () => {
        expect(group).toEqual([groupStub]);
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      const dto: GroupDto = { name: 'renamed group' };
      const id: number = 1;
      const userId: number = 1;
      let group: Group;

      beforeEach(async () => {
        group = await groupController.update(dto, id, userId);
      });

      test('then it should call groupService', () => {
        expect(groupService.update).toBeCalledWith(dto, id, userId);
      });

      test('then it should return group', () => {
        expect(group).toEqual(groupStub);
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      const id: number = 1;
      const userId: number = 1;
      let response: DeletedResponse;

      beforeEach(async () => {
        response = await groupController.delete(id, userId);
      });

      test('then it should call groupService', () => {
        expect(groupService.delete).toBeCalledWith(id, userId);
      });

      test('then it should return groups', () => {
        expect(response).toEqual(deletedResponseStub);
      });
    });
  });
});
