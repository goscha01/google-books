import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  errorMessage!: string;
  books!: any[];
  searchQuery!: string;
  recomendedQuery: string = 'flowers';
  isInitialQueryEmpty: boolean = true;

  constructor(private bookService: BookService) {
    this.searchQuery = this.bookService.query;
    this.searchQuery
      ? (this.isInitialQueryEmpty = false)
      : (this.isInitialQueryEmpty = true);

  }

  ngOnInit(): void {
    this.isInitialQueryEmpty
      ? this.getQueryParamResult(this.recomendedQuery)
      : this.getQueryParamResult(this.searchQuery);
  }

  receiveQuery(query: string) {
    this.isInitialQueryEmpty = false;
    this.bookService.query = query;
    this.searchQuery = this.bookService.query;

    this.getQueryParamResult(this.searchQuery);
  }

  // Parametirised query to server.js
  getQueryParamResult(query: string): void {
    this.bookService.getBookQueryParam(query).subscribe(
      (books: any) => {
        console.log(books)
        if(books === null) {
          this.errorMessage = 'No books found'
        } else {
          this.errorMessage = ''
          this.books = books;
        }

        console.log(this.errorMessage)
      },
      (error: any) => (this.errorMessage = error as any)
    );

  }

  dummy() {} //empty function because I need to pass something into search-bar conmponent. Find s;ution later
}
