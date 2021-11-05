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


  getDefaultBook(): void {
    this.bookService.getBook().subscribe(
      (book: any) => this.defaultBook = book,
      (error: any) => this.errorMessage = error as any);
  }

  showServerResult() {
    this.getDefaultBook()
    console.log('test')
  }


  onSubmit() {
    console.log('onSubmit')
    console.log(this.searchQuery)
    this.router.navigate(['/books']);
    this.showServerResult()
     }
}

