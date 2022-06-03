import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EhEmailUnico } from './eh-email-unico.validator';
import { EhLoginUnico } from './eh-nome-de-usuario-unico.validator';

export class Usuario {
  id: number;

  @Expose({
    name: 'name',
  })
  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório',
  })
  @IsString({
    message: 'Nome do usuário precisa ser uma string.',
  })
  nome: string;

  @Expose({
    name: 'email',
  })
  @IsEmail(
    {},
    {
      message: 'Email precisa ser um endereço válido.',
    },
  )
  @EhEmailUnico({
    message: 'Email precisa ser único',
  })
  email: string;

  @EhLoginUnico({
    message: 'Login precisa ser único',
  })
  @IsNotEmpty({
    message: 'Login é obrigatório.',
  })
  login: string;

  @Expose({
    name: 'password',
  })
  @Exclude({
    toPlainOnly: true, // excluindo a senha no processo de serialização, quando pego o objeto e converte em objeto plano
  })
  @IsNotEmpty({
    message: 'Senha é obrigatório.',
  })
  senha: string;

  @Expose({
    name: 'joinDate', // a api irá esperar este nome de atributo, porém dentro da aplicação será tratado como "dataEntrada"
  })
  dataEntrada: Date;
}
