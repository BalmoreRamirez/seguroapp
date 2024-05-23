import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post(':idClub')
  async create(
    @Body() user: Partial<User>,
    @Param('idClub') idClub: number,
  ): Promise<User> {
    return await this.userService.create({ user, idClub });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedData: Partial<User>,
  ): Promise<User> {
    return await this.userService.update(id, updatedData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.delete(id);
    return { message: 'Usuario eliminado con éxito' };
  }
}
