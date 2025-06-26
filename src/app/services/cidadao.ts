import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cidadao {
  NM_CIDADAO: string;
  NR_CPF: string;
  NR_CEP: string;
  RUA: string;
  NR_LOTE: string;
  DS_BAIRRO: string;
  CD_UF: string;
  ESTADO: string;
  DESCR_MUNIC: string;
  CD_TIPO_FONE: string;
  NR_TELEFONE: string;
}

@Injectable({
  providedIn: 'root'
})
export class CidadaoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  buscarCidadao(cpf?: string, atendimento?: string): Observable<Cidadao[]> {
    let params: any = {};
    
    if (cpf) {
      params.cpf = cpf;
    }
    
    if (atendimento) {
      params.atendimento = atendimento;
    }

    return this.http.get<Cidadao[]>(`${this.apiUrl}/cidadao`, { params });
  }
}
