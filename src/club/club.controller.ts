import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
  Put,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './club.entity';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../AuthUsuario/jwt-auth.guard';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<{ club: Club; userCount: number }[]> {
    return await this.clubService.findAll();
  }

  @Get(':id/users')
  async findUsers(@Param('id') id: string): Promise<User[]> {
    return await this.clubService.findUsers(id);
  }

  @Post('ingresar')
  @UseGuards(JwtAuthGuard)
  async create(@Body() club: Club): Promise<Club> {
    return await this.clubService.create(club);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const club = await this.clubService.findOne(Number(id));

    if (!club) {
      throw new NotFoundException('El club con el ID proporcionado no existe');
    }

    const isClubAssociatedWithAnyUser =
      await this.clubService.isClubAssociatedWithAnyUser(club);

    if (isClubAssociatedWithAnyUser) {
      throw new ForbiddenException(
        'El club no puede ser eliminado porque está asociado con un usuario',
      );
    }

    await this.clubService.delete(id);
    return { message: 'El club ha sido eliminado exitosamente' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateClubDto: Partial<Club>,
  ): Promise<Club> {
    return await this.clubService.update(Number(id), updateClubDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Club> {
    return await this.clubService.findOneId(id);
  }
}
