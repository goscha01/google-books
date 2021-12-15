import { Component, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-db-table',
  templateUrl: './db-table.component.html',
  styleUrls: ['./db-table.component.css'],
})
export class DbTableComponent implements OnInit {
  sortoption: string='0';
  books!: any[];
  errorMessage!: string;
  succesMessage!: string;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getQueryParamResult();

  }

  //Get all data from DB
  getQueryParamResult(): void {
        console.log('getQueryParamResult')
    this.bookService.getBooksFromDB().subscribe(
      (books: any) => (this.books = books),
      (error: any) => (this.errorMessage = error as any)
    );

  }

  //Delete a book with lowest ID
  deleteData(bookId:any) {
    console.log(bookId)
    this.bookService.deleteBookFromDB(bookId).subscribe(
      (result: any) => {
        // this.books = books
        this.getQueryParamResult();
        // console.log(result.message)
        this.succesMessage = result.message;
        setTimeout(() => {
          this.succesMessage = '';
       }, 3000)

      },
      (error: any) => (this.errorMessage = error as any)
    );

  }

  //Delete all books from DB
  deleteAllData() {
    this.bookService.deleteAllBooksFromDB().subscribe(
      (result: any) => (this.succesMessage = result.message),
      (error: any) => (this.errorMessage = error as any)
    );
    this.getQueryParamResult();
  }
}
