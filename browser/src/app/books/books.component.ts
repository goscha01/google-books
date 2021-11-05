import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  defaultBook:any = "testBook";
  errorMessage!: string;
  books!:any;
  searchQuery:String = 'flowers';
  submitted: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getQueryResult()
    console.log(this.books)
  }

  onSubmit() {
    console.log('onSubmit')

    this.submitted = true; }

    getDefaultBook(): void {
      this.bookService.getBook().subscribe(
        (book: any) => this.defaultBook = book,
        (error: any) => this.errorMessage = error as any);
    }

    showServerResult() {
      this.getDefaultBook()
      console.log('test')
      console.log(this.books )
    }

    getQueryResult(): void {
      console.log('getQueryResult()')
      this.bookService.getBookQuery().subscribe(
        (books:any) => this.books = books.data.items,
        (error: any) => this.errorMessage = error as any);

    }
}
