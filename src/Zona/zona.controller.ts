// src/zona/zona.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ZonaService } from './zona.service';
import { Zona } from './zona.entity';

@Controller('zonas')
export class ZonaController {
  constructor(private readonly zonaService: ZonaService) {}

  @Get()
  async findAll(): Promise<Zona[]> {
    return await this.zonaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Zona> {
    return await this.zonaService.findOne(id);
  }

  // Add other methods as needed...
}
