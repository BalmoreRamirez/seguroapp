// src/zona/zona.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Club } from '../club/club.entity';

@Entity('zonas')
export class Zona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @OneToMany(() => Club, (club) => club.zona)
  clubs: Club[];
}
