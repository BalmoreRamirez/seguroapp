// src/zona/zona.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zona } from './zona.entity';

@Injectable()
export class ZonaService {
  constructor(
    @InjectRepository(Zona)
    private zonaRepository: Repository<Zona>,
  ) {}

  findAll(): Promise<Zona[]> {
    return this.zonaRepository.find();
  }

  findOne(id: number): Promise<Zona> {
    return this.zonaRepository.findOne({ where: { id: id } });
  }

  // Add other methods as needed...
}
