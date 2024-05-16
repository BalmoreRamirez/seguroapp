import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './club.entity';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../AuthUsuario/jwt-auth.guard';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Club[]> {
    return await this.clubService.findAll();
  }

  @Get(':id/users')
  async findUsers(@Param('id') id: string): Promise<User[]> {
    return await this.clubService.findUsers(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() club: Club): Promise<Club> {
    return await this.clubService.create(club);
  }
}
