import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  constructor(public login: LoginService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggendIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((dato) => {
      this.isLoggedIn = this.login.isLoggendIn();
      this.user = this.login.getUser();
    });
  }
  public logout() {
    this.login.logOut();
    window.location.reload();
  }
}
