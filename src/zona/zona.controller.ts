// src/zona/zona.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ZonaService } from './zona.service';
import { Zona } from './zona.entity';
import { JwtAuthGuard } from '../AuthUsuario/jwt-auth.guard';

@Controller('zonas')
export class ZonaController {
  constructor(private readonly zonaService: ZonaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Zona[]> {
    return await this.zonaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Zona> {
    return await this.zonaService.findOne(id);
  }

  // Add other methods as needed...
}
