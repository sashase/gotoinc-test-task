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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequest,
  Todo,
  TodoCreate,
  TodoUpdate,
  UpdatedTodo,
} from './schemas';
import { Deleted, Id, NotFound, Unauthorized } from '../common/schemas';
import { GetUserId } from '../common/decorators';
import { CreateDto, UpdateDto } from './dto';
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
    description: 'Created todo',
    type: Todo,
  })
  @ApiBadRequestResponse({
    description: 'Empty body',
    type: BadRequest,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
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
  @ApiOkResponse({
    description: 'Founded TODO',
    type: Todo,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: NotFound,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param() id: number, @GetUserId() userId: number) {
    return this.todoService.findById(id, userId);
  }

  @ApiOperation({ summary: 'Find all your TODOs' })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    description: 'Founded TODOs',
    type: Todo,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: NotFound,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
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
    description: 'Updated TODO',
    type: UpdatedTodo,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: NotFound,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
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
    description: 'Todo deleted',
    type: Deleted,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: NotFound,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param() id: number, @GetUserId() userId: number) {
    return this.todoService.delete(id, userId);
  }
}
