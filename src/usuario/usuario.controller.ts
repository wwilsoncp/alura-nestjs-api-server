import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
export class UsuarioController {
  //
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  public buscaTodos(): Usuario[] {
    return this.usuarioService.buscaTodos();
  }

  @Get(':login')
  public buscaPorLogin(@Param() params: string[]): Usuario {
    const usuarioEncontrado = this.usuarioService.buscaPorLogin(
      params['login'],
    );
    if (!usuarioEncontrado) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return usuarioEncontrado;
  }

  @Post()
  public cria(@Body() usuario: Usuario): NestResponse {
    const usuarioCriado = this.usuarioService.cria(usuario);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeaders({ Location: `/users/${usuarioCriado.login}` })
      .comBody(usuarioCriado)
      .build();
    // return new NestResponseBuilder().comStatus(HttpStatus.CREATED).comHeaders({'Location',}).comBody(usuarioCriado).build();
  }
}
