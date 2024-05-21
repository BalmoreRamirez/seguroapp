// src/zona/zona.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonaService } from './zona.service';
import { ZonaController } from './zona.controller';
import { Zona } from './zona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zona])],
  providers: [ZonaService],
  controllers: [ZonaController],
  exports: [ZonaService],
})
export class ZonaModule {}
