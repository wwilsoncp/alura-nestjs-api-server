import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from './usuario.service';

@Injectable()
@ValidatorConstraint()
export class EhLoginUnicoConstraint implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}
  validate(
    login: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.usuarioService.buscaPorLogin(login);
  }
}

export function EhLoginUnico(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor, // o método construtor do objeto em questão
      propertyName: propertyName, // o nome da propriedade que está sendo validada
      options: validationOptions, // as opções de validação, recebida como parâmetros do decorators
      constraints: [], // validações extras, mínimo 5 caracteres, no máximo 100, por exemplo
      // a classe que implementa a interface "ValidatorConstraintInterface" que contém o método "validate", a real função que irá implementar a regra de validação
      validator: EhLoginUnicoConstraint,
    });
  };
}
