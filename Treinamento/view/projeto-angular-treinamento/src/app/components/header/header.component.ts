import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user?: string;

  constructor(private loginService: LoginService,
    private router: Router,
    private location: Location,
    private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isPresent();
  }

  isPresent(){
    this.user = this.localStorage.get('username')
    return this.loginService.isAuthenticated()
  }

  logOut(){
    this.loginService.logOut();
    this.user = '';
    this.isPresent();
    this.router.navigateByUrl('');
  }


}
