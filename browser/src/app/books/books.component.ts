import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  errorMessage!: string;
  books!:Book[];
  searchQuery:string = 'flower';
  submitted: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getQueryParamResult()
    // console.log(this.books)
  }

  onSubmit() {
    console.log('onSubmit')
    this.submitted = true;

  }

  getQueryParamResult(): void {
    console.log('getQueryResult()')
    this.bookService.getBookQueryParam(this.searchQuery).subscribe(
      (books:any) => this.books = books.items,
      (error: any) => this.errorMessage = error as any);
  }

  showServerResult() {
    console.log('showServerResult()')
    this.getQueryParamResult()
    console.log(this.books )
  }

}
