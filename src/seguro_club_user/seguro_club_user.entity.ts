import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
