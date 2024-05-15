import { User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Club[]> {
    return this.clubsRepository.find();
  }

  async findUsers(clubId: string): Promise<any> {
    if (!clubId) {
      throw new Error('Club ID is required');
    }

    const club = await this.clubsRepository.findOne({
      where: { id: Number(clubId) },
      relations: ['seguroClubUsers'],
    });
    const users = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.seguroClubUsers', 'seguroClubUser')
      .innerJoin('seguroClubUser.club', 'club')
      .where('club.id = :clubId', { clubId: Number(clubId) })
      .getMany();

    return { club, users };
  }
}
