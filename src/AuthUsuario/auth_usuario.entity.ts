import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_usuario')
export class AuthUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  usuario: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  rol: string;
}
