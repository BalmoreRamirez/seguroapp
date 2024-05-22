import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { Club } from './club.entity';
import { UserModule } from '../user/user.module'; // import UserModule

@Module({
  imports: [TypeOrmModule.forFeature([Club]), UserModule], // add UserModule to the imports array
  providers: [ClubService],
  controllers: [ClubController],
})
export class ClubModule {}
