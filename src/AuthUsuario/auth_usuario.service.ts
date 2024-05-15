import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUsuario } from './auth_usuario.entity';
import { CreateAuthUsuarioDto } from './create-auth-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class AuthUsuarioService {
  constructor(
    @InjectRepository(AuthUsuario)
    private authUsuarioRepository: Repository<AuthUsuario>,
    private jwtService: JwtService,
  ) {}

  async create(
    createAuthUsuarioDto: CreateAuthUsuarioDto,
  ): Promise<AuthUsuario> {
    const authUsuario = new AuthUsuario();
    authUsuario.usuario = createAuthUsuarioDto.usuario;
    authUsuario.rol = createAuthUsuarioDto.rol;

    // Codificar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt();
    authUsuario.password = await bcrypt.hash(
      createAuthUsuarioDto.password,
      salt,
    );

    return this.authUsuarioRepository.save(authUsuario);
  }

  async authenticate(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { usuario, password } = authCredentialsDto;
    const user = await this.authUsuarioRepository.findOne({
      where: { usuario },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { usuario };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Las credenciales son inválidas');
    }
  }
}
