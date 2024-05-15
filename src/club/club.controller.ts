import { Controller, Get, Param } from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './club.entity';
import { User } from '../user/user.entity';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  async findAll(): Promise<Club[]> {
    return await this.clubService.findAll();
  }

  @Get(':id/users')
  async findUsers(@Param('id') id: string): Promise<User[]> {
    return await this.clubService.findUsers(id);
  }
}
