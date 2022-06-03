import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // declarar os pipes para servir para toda aplicação de forma global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Definindo o container de injeção de dependência para o class-validator
  // 1. useContainer -> Função do class-validator
  // 2. O primeiro parâmetro representa quem constitui o container de injeção de dependência
  //    No caso, o próprio Nest irá delegar para o framework Nest o controle da injeção de dependência, inclusive para o class-validator
  //    "app" - representa a aplicação, que tem o método "select" - que recebe o módulo
  //    "select" - recebe um módulo representante da aplicação, no caso o AppModule
  // 3. O segundo parâmetro é um objeto javascript que contém a configuração "fallbackOnErrors" = "true"
  //    Significa que: Caso de algum erro de injeção de dependência dentro do contexto do class-decorator,
  //                   irá delegar o tratamento de erro para o container de injeção de dependência do primeiro parâmetro, no caso, a própria aplicação nest.
  // Observação: Esta linha foi necessária para utilizar a injeção de dependência dentro dos decorators do class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3004); // porta do serviço
}
bootstrap();
