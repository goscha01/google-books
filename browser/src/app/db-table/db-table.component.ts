import { Component, OnInit } from '@angular/core';
import { Book } from '../books/book';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-db-table',
  templateUrl: './db-table.component.html',
  styleUrls: ['./db-table.component.css'],
})
export class DbTableComponent implements OnInit {
  sortoption!: string;
  books!: any[];
  errorMessage!: string;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getQueryParamResult();
    console.log(this.books)
  }

  //Get all data from DB
  getQueryParamResult(): void {
    this.bookService.getBooksFromDB().subscribe(
      (books: any) => (this.books = books),
      (error: any) => (this.errorMessage = error as any)
    );

  }

  //Delete a book with lowest ID
  deleteData() {
    this.bookService.deleteBookFromDB().subscribe(
      (books: any) => (this.books = books),
      (error: any) => (this.errorMessage = error as any)
    );
    window.location.reload(); //remove or change for hook
  }

  //Delete all books from DB
  deleteAllData() {
    this.bookService.deleteAllBooksFromDB().subscribe(
      (books: any) => (this.books = books),
      (error: any) => (this.errorMessage = error as any)
    );
    window.location.reload(); //remove or change for hook
  }
}
