import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment }  from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';
// import AppButtonComponent from './auth-button/auth-button.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'full-stack-challenge';
  defaultBook: any = 'testBook';
  errorMessage!: string;
  searchQuery: String = '';
  isCollapsed:boolean = true;

  constructor(private router: Router, public auth: AuthService) {
    console.log(environment.auth);
  }

  onSubmit() {
    this.router.navigate(['/books']);
  }
}
