import { Module } from '@nestjs/common';
import { EhEmailUnicoConstraint } from './eh-email-unico.validator';
import { EhLoginUnicoConstraint } from './eh-nome-de-usuario-unico.validator';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, EhLoginUnicoConstraint, EhEmailUnicoConstraint],
})
export class UsuarioModule {}
