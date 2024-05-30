import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

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

  @Post('upload/:idClub')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Param('idClub') idClub: number,
  ): Promise<User[]> {
    if (!file || !file.buffer) {
      throw new BadRequestException(
        'File not provided or file buffer is undefined',
      );
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const users = jsonData
      .map((row) => {
        const edad = parseInt(row[2]);
        if (isNaN(edad)) {
          return null;
        }
        return {
          nombre: row[0],
          apellido: row[1],
          edad: edad,
          seguro: row[3],
        };
      })
      .filter((user) => user !== null);

    return await this.userService.createMany({ users, idClub });
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
