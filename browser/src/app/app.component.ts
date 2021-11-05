import { Component } from '@angular/core';
import { BookService } from './books/book.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'full-stack-challenge';
  defaultBook:any = "testBook";
  errorMessage!: string;
  searchQuery:String = '';

  constructor(private bookService: BookService, private router: Router) { }




  showServerResult() {
    console.log('search query home' + this.searchQuery)
  }


  onSubmit() {
    // console.log('onSubmit')
    this.router.navigate(['/books']);
    // this.showServerResult()
     }
}

