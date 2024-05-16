import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { Club } from './club.entity';
import { UserModule } from '../user/user.module'; // Importa UserModule

@Module({
  imports: [TypeOrmModule.forFeature([Club]), UserModule],
  providers: [ClubService],
  controllers: [ClubController],
})
export class ClubModule {}
