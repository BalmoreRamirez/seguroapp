import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClubModule } from './club/club.module';
import { SeguroClubUserModule } from './seguro_club_user/seguro_club_user.module';
import { AuthUsuarioModule } from './AuthUsuario/auth_usuario.module';
import { ZonaModule } from './zona/zona.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'seguroapp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ZonaModule,
    ClubModule,
    SeguroClubUserModule,
    AuthUsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
