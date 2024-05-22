import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
