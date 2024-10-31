import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('api/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Returns the user with the referenced id' })
  @ApiBearerAuth()
  findOneOrFail(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch('')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update the authenticated user' })
  @ApiBearerAuth()
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const id: number = req['user'].sub;

    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete('')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete the authenticated user' })
  @ApiBearerAuth()
  remove(@Req() req: Request) {
    const id: number = req['user'].sub;
    return this.usersService.remove(+id);
  }
}
