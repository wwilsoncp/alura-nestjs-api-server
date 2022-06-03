import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FiltroDeExcecaoHttp } from './common/filtros/filtro-de-excecao-http.filter';
import { TransformaRespostaIntercetor } from './core/http/transforma-resposta.interceptor';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Provider necessário para funcionar a serialização das informações, para uso do Expose e Exclude nas entities.
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    // Provider necessário para transformar o response das requisições para o padrão de headers, status e body
    { provide: APP_INTERCEPTOR, useClass: TransformaRespostaIntercetor },
    // Provider necessário para funcionar o tratamento de exceção genérico
    { provide: APP_FILTER, useClass: FiltroDeExcecaoHttp },
  ],
})
export class AppModule {}
