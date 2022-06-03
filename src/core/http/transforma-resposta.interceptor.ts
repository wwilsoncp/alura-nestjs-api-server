import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { NestResponse } from './nest-response';

// Insteceptor responsável por capturar a resposta (NestReponse) e manipular os dados
@Injectable()
export class TransformaRespostaIntercetor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(private adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((respostaDoControlador: NestResponse) => {
        if (respostaDoControlador instanceof NestResponse) {
          const contexto = context.switchToHttp();
          const response = contexto.getResponse();
          const { headers, status, body } = respostaDoControlador;

          // obterndo um array com o nome de todos os cabeçalhos do headers ['cabecalho1', 'cabecalho2', 'cabeçalho3'...]
          const nomesDosCabecalhos = Object.getOwnPropertyNames(headers);

          // obtendo o valor de cada item do cabeçalho, e setando no header do httpAdapter
          nomesDosCabecalhos.forEach((nomeDoCabecalho) => {
            const valorDoCabecalho = headers[nomeDoCabecalho];
            this.httpAdapter.setHeader(
              response,
              nomeDoCabecalho,
              valorDoCabecalho,
            );
          });
          this.httpAdapter.status(response, status);
          return body;
        }
        return respostaDoControlador;
      }),
    );
  }
}
