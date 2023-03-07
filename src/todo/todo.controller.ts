import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { GetUserId } from '../common/decorators';
import { CreateDto, UpdateDto } from './dto';
import {
  BadRequest,
  Deleted,
  Id,
  NotFound,
  Todo,
  TodoCreate,
  TodoUpdate,
  UpdatedTodo,
} from './schemas';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: 'Create a new TODO' })
  @ApiBody({
    type: TodoCreate,
  })
  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({
    status: 201,
    description: 'Created todo',
    type: Todo,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Empty body',
    type: BadRequest,
  })
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateDto, @GetUserId() userId: number) {
    return this.todoService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Find TODO by id' })
  @ApiParam({
    name: 'id',
    type: Id,
  })
  @ApiBearerAuth('Authorization')
  @ApiFoundResponse({
    status: 302,
    description: 'Founded TODO',
    type: Todo,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  findById(@Param() id: number, @GetUserId() userId: number) {
    return this.todoService.findById(id, userId);
  }

  @ApiOperation({ summary: 'Find all your TODOs' })
  @ApiBearerAuth('Authorization')
  @ApiFoundResponse({
    status: 302,
    description: 'Founded TODOs',
    type: Todo,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll(@GetUserId() userId: number) {
    return this.todoService.findAll(userId);
  }

  @ApiOperation({ summary: 'Update TODO' })
  @ApiParam({
    name: 'id',
    type: Id,
  })
  @ApiBody({
    type: TodoUpdate,
  })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    status: 200,
    description: 'Updated TODO',
    type: UpdatedTodo,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() dto: UpdateDto,
    @Param() id: number,
    @GetUserId() userId: number,
  ) {
    return this.todoService.update(dto, id, userId);
  }

  @ApiOperation({ summary: 'Delete TODO' })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    status: 200,
    description: 'Todo deleted',
    type: Deleted,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not Found',
    type: NotFound,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param() id: number, @GetUserId() userId: number) {
    return this.todoService.delete(id, userId);
  }
}
