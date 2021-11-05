import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  defaultBook:any = "testBook";
  errorMessage!: string;
  searchQuery:String = '';
  books!:any[];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
  }
  getDefaultBook(): void {
    this.bookService.getBook().subscribe(
      (book: any) => this.defaultBook = book,
      (error: any) => this.errorMessage = error as any);
  }

  getQueryResult(): void {
    this.bookService.getBookQuery().subscribe(
      (books:any[]) => this.books = books,
      (error: any) => this.errorMessage = error as any);
  }

  showServerResult() {
    console.log('showServerResult()')
    this.getDefaultBook()
    console.log('getDefaultBook()')
    this.getQueryResult()
    console.log('getQueryResult()')
    console.log(this.books)

  }


  onSubmit() {
    console.log('onSubmit')
    console.log(this.searchQuery)
    this.router.navigate(['/books']);
    this.showServerResult()
     }
}
