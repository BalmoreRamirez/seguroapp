import { User } from '../user/user.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return this.clubsRepository.find({ relations: ['zona'] });
  }

  async findOne(id: number): Promise<Club> {
    return await this.clubsRepository.findOne({ where: { id: id } });
  }

  async findUsers(clubId: string): Promise<any> {
    if (!clubId) {
      throw new Error('Club ID is required');
    }

    const club = await this.clubsRepository.findOne({
      where: { id: Number(clubId) },
      relations: ['zona'],
    });
    const users = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.seguroClubUsers', 'seguroClubUser')
      .innerJoin('seguroClubUser.club', 'club')
      .where('club.id = :clubId', { clubId: Number(clubId) })
      .getMany();

    return { club, users };
  }

  async create(club: Club): Promise<Club> {
    const existingClub = await this.clubsRepository.findOne({
      where: { nombre: club.nombre },
    });

    if (existingClub) {
      throw new ConflictException('El nombre del club ya existe');
    }
    return await this.clubsRepository.save(club);
  }

  async delete(id: string): Promise<void> {
    await this.clubsRepository.delete(id);
  }

  async isClubAssociatedWithAnyUser(club: Club): Promise<boolean> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.seguroClubUsers', 'seguroClubUser')
      .innerJoin('seguroClubUser.club', 'club')
      .where('club.id = :clubId', { clubId: club.id })
      .getMany();

    return users.length > 0;
  }

  async update(id: number, updateClubDto: Partial<Club>): Promise<Club> {
    const club = await this.findOne(id);
    if (!club) {
      throw new NotFoundException(`Club con ID ${id} no existe`);
    }

    const existingClub = await this.clubsRepository.findOne({
      where: { nombre: updateClubDto.nombre },
    });

    if (existingClub && existingClub.id !== id) {
      throw new ConflictException('El nombre del club ya existe');
    }

    Object.assign(club, updateClubDto);
    return this.clubsRepository.save(club);
  }
}
