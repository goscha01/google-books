import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/books']);
  }
}
