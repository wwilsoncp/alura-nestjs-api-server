export class NestResponse {
  status: number;
  headers: Object;
  body: Object;

  constructor(resposta: NestResponse) {
    // todas as informações de resposta irá para o objeto em questão, clonando as informações
    Object.assign(this, resposta);
  }
}
