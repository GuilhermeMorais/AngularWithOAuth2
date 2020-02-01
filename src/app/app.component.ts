import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'AppProjectManager';
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.loginChanged.subscribe(result => {
      this.isLoggedIn = result;
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().then(result => {
      this.isLoggedIn = result;
    });
  }

  login() {
    this.authService.login();
  }
}
