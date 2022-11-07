import { LocalStorageService } from './../../../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICliente } from './../../../interfaces/cliente';
import { LoginService } from 'src/app/services/login.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Login } from 'src/app/interfaces/login';
import { ClientesService } from 'src/app/services/clientes.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cpfCliente = '';
  cliente?: ICliente;

  constructor(private formBuilder: NonNullableFormBuilder,
    private loginService: LoginService,
    private clienteService: ClientesService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.cpfCliente = this.localStorage.get('cpf');
    this.clienteService.buscarClientePorCpf(this.cpfCliente).subscribe((cliente: ICliente) => {
      this.cliente = cliente
    })
  }

  formLogin = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onCadastro(){
    let login: Login = this.formLogin.value as Login;
    login.cliente = this.cliente;

    console.log(login)
    this.loginService.cadastro(login).subscribe(()=> {
      this.alert.alertaSucesso('Login Cadastrado com sucesso!');
      this.router.navigate(['login']);
    }, (erro: Error) => {
      this.alert.alertaErro('Falha no cadastro do Login!')
    });




  }

}
