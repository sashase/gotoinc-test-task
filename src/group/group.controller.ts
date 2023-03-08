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
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  BadRequest,
  Deleted,
  Forbidden,
  Group,
  GroupAlreadyExists,
  GroupCreate,
  GroupUpdate,
  UpdatedGroup,
} from './schemas';
import { Id, NotFound, Unauthorized } from '../common/schemas';
import { GetUserId } from '../common/decorators';
import { GroupDto } from './dto/group.dto';
import { GroupService } from './group.service';

@Controller('group')
@ApiBearerAuth('Authorization')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({ summary: 'Create a new group' })
  @ApiBody({
    type: GroupCreate,
  })
  @ApiCreatedResponse({
    description: 'Created group',
    type: Group,
  })
  @ApiBadRequestResponse({
    description: 'Empty body',
    type: BadRequest,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Group with this username already exists',
    type: GroupAlreadyExists,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: GroupDto, @GetUserId() userId: number) {
    return this.groupService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Find group by id' })
  @ApiParam({
    name: 'id',
    type: Id,
  })
  @ApiBearerAuth('Authorization')
  @ApiFoundResponse({
    description: 'Founded group',
    type: Group,
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
    return this.groupService.findById(id, userId);
  }

  @ApiOperation({ summary: 'Find all your groups' })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    description: 'Founded groups',
    type: Group,
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
    return this.groupService.findAll(userId);
  }

  @ApiOperation({ summary: 'Update group' })
  @ApiParam({
    name: 'id',
    type: Id,
  })
  @ApiBody({
    type: GroupUpdate,
  })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    description: 'Updated group',
    type: UpdatedGroup,
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
    @Body() dto: GroupDto,
    @Param() id: number,
    @GetUserId() userId: number,
  ) {
    return this.groupService.update(dto, id, userId);
  }

  @ApiOperation({ summary: 'Delete group' })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({
    description: 'Group deleted',
    type: Deleted,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: NotFound,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    type: Forbidden,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Unauthorized,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param() id: number, @GetUserId() userId: number) {
    return this.groupService.delete(id, userId);
  }
}
