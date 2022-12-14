import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAcoes() {
    return this.httpClient
      .get<AcoesAPI>('http://localhost:3000/acoes')
      .pipe(
        tap(valor => console.log(valor)),
        pluck('payload'), //extrai o atributo do objeto recebido
        map(acoes => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
      );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    else if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }
    else {
      return 0;
    }
  }
}
