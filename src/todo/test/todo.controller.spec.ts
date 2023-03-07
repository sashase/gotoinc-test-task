import { Test } from '@nestjs/testing';
import { CreateDto, UpdateDto } from '../dto';
import { TodoController } from '../todo.controller';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { DeletedResponse } from '../types';
import { deletedResponseStub, todoStub } from './stubs';

jest.mock('../todo.service');

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoController = moduleRef.get<TodoController>(TodoController);
    todoService = moduleRef.get<TodoService>(TodoService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create is called', () => {
      const dto: CreateDto = { text: 'do something' };
      const userId: number = 1;
      let todo: Todo;

      beforeEach(async () => {
        todo = await todoController.create(dto, userId);
      });

      test('then it should call todoService', () => {
        expect(todoService.create).toBeCalledWith(dto, userId);
      });

      test('then it should return todo', () => {
        expect(todo).toEqual(todoStub);
      });
    });
  });

  describe('findById', () => {
    describe('when findById is called', () => {
      const id: number = 1;
      const userId: number = 1;
      let todo: Todo;

      beforeEach(async () => {
        todo = await todoController.findById(id, userId);
      });

      test('then it should call todoService', () => {
        expect(todoService.findById).toBeCalledWith(id, userId);
      });

      test('then it should return todo', () => {
        expect(todo).toEqual(todoStub);
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      const userId: number = 1;
      let todo: Todo[];

      beforeEach(async () => {
        todo = await todoController.findAll(userId);
      });

      test('then it should call todoService', () => {
        expect(todoService.findAll).toBeCalledWith(userId);
      });

      test('then it should return todos', () => {
        expect(todo).toEqual([todoStub]);
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      const dto: UpdateDto = { text: 'updated text', isCompleted: true };
      const id: number = 1;
      const userId: number = 1;
      let todo: Todo;

      beforeEach(async () => {
        todo = await todoController.update(dto, id, userId);
      });

      test('then it should call todoService', () => {
        expect(todoService.update).toBeCalledWith(dto, id, userId);
      });

      test('then it should return todo', () => {
        expect(todo).toEqual(todoStub);
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      const id: number = 1;
      const userId: number = 1;
      let response: DeletedResponse;

      beforeEach(async () => {
        response = await todoController.delete(id, userId);
      });

      test('then it should call todoService', () => {
        expect(todoService.delete).toBeCalledWith(id, userId);
      });

      test('then it should return todos', () => {
        expect(response).toEqual(deletedResponseStub);
      });
    });
  });
});
