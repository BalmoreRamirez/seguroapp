import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SeguroClubUser } from '../seguro_club_user/seguro_club_user.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 255 })
  iglesia: string;

  @Column({ length: 255 })
  zona: string;

  @Column({ length: 255 })
  distrito: string;

  @Column('int')
  telefono: number;

  @OneToMany(() => SeguroClubUser, (seguroClubUser) => seguroClubUser.user)
  seguroClubUsers: SeguroClubUser[];
}
