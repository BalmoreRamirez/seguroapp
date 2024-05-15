import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SeguroClubUser } from '../seguro_club_user/seguro_club_user.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 255 })
  apellido: string;

  @Column('int')
  edad: number;

  @Column('boolean')
  seguro: boolean;

  @OneToMany(() => SeguroClubUser, (seguroClubUser) => seguroClubUser.user)
  seguroClubUsers: SeguroClubUser[];
}
