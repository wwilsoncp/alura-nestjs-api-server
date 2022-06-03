import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private usuarios: Usuario[] = [];
  public cria(usuario): Usuario {
    this.usuarios.push(usuario);
    return usuario;
  }

  public buscaTodos(): Usuario[] {
    return this.usuarios;
  }

  public buscaPorLogin(login: string): Usuario {
    return this.usuarios.find((usuario: Usuario) => {
      return usuario.login === login;
    });
  }

  public buscaPorEmail(email: string): Usuario {
    return this.usuarios.find((usuario: Usuario) => {
      return usuario.email === email;
    });
  }
}
