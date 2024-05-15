import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguroClubUserController } from './seguro_club_user.controller';
import { SeguroClubUserService } from './seguro_club_user.service';
import { SeguroClubUser } from './seguro_club_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeguroClubUser])],
  controllers: [SeguroClubUserController],
  providers: [SeguroClubUserService],
})
export class SeguroClubUserModule {}
