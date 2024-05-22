import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SeguroClubUser } from '../seguro_club_user/seguro_club_user.entity';
import { Club } from '../club/club.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(SeguroClubUser)
    private seguroClubUserRepository: Repository<SeguroClubUser>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(userData: {
    user: Partial<User>;
    idClub: number;
  }): Promise<User> {
    try {
      const newUser = this.usersRepository.create(userData.user);
      await this.usersRepository.save(newUser);
      const club = await this.clubRepository.findOne({
        where: { id: userData.idClub },
      });
      if (!club) {
        throw new NotFoundException(
          `Club with id ${userData.idClub} not found`,
        );
      }

      // Create a new SeguroClubUser for the new user associated with the club
      const newSeguroClubUser = this.seguroClubUserRepository.create({
        user: newUser,
        club: club,
      });
      await this.seguroClubUserRepository.save(newSeguroClubUser);

      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Un usuario con este nombre y apellido ya existe',
        );
      }
      throw error;
    }
  }
}
