import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { Operacoes } from '../interfaces/operacoes';
import { Transfer } from '../interfaces/transfer';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  endpoint = 'contas';
  api = environment.api;


  constructor(private http: HttpClient,
    private loginService: LoginService) { }


  listarTodasContas() {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}/all`);
  }

  listarContasPorCpf(cpf: string) {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}/buscarContas/${cpf}`);
  }

  buscarContaPorId(id: number) {
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/${id}`);
  }

  adcionarConta(cpf: string){
    return this.http.post<IConta>(`${this.api}/${this.endpoint}/create`, cpf, this.loginService.getOptions());
  }

  removerConta(id: number){
    return this.http.delete<IConta>(`${this.api}/${this.endpoint}/del/${id}`, this.loginService.getOptions());
  }


  saque(operacao: Operacoes){
    return this.http.put(`${this.api}/${this.endpoint}/sacar`, operacao, this.loginService.getOptions());
  }
  deposito(operacao: Operacoes){
    return this.http.put(`${this.api}/${this.endpoint}/deposito`, operacao, this.loginService.getOptions());
  }
  transferencia(transfer: Transfer){
    return this.http.put(`${this.api}/${this.endpoint}/transferencia`, transfer, this.loginService.getOptions());
  }
}
