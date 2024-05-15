import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Club } from '../club/club.entity';

@Entity('seguro_club_user')
export class SeguroClubUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Club)
  @JoinColumn({ name: 'idClub' })
  club: Club;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'idUser' })
  user: User;
}
