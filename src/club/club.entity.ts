import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeguroClubUser } from '../seguro_club_user/seguro_club_user.entity';
import { Zona } from '../zona/zona.entity';

@Entity('clubs')
@Unique(['nombre'])
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 255 })
  iglesia: string;

  @ManyToOne(() => Zona, (zona) => zona.clubs)
  @JoinColumn({ name: 'id_zona' }) // This is the foreign key in the Club table
  zona: Zona;

  @Column({ length: 255 })
  distrito: string;

  @Column('int')
  telefono: number;

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

  @OneToMany(() => SeguroClubUser, (seguroClubUser) => seguroClubUser.user)
  seguroClubUsers: SeguroClubUser[];
}
