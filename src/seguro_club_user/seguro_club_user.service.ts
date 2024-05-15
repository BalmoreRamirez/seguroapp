import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeguroClubUser } from './seguro_club_user.entity';

@Injectable()
export class SeguroClubUserService {
  constructor(
    @InjectRepository(SeguroClubUser)
    private seguroClubUserRepository: Repository<SeguroClubUser>,
  ) {}

  findAll(): Promise<SeguroClubUser[]> {
    return this.seguroClubUserRepository.find();
  }
}