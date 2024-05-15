import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUsuario } from './auth_usuario.entity';
import { CreateAuthUsuarioDto } from './create-auth-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUsuarioService {
  constructor(
    @InjectRepository(AuthUsuario)
    private authUsuarioRepository: Repository<AuthUsuario>,
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
}
