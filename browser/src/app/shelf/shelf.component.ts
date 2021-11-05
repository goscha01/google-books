import { Component, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  userId=106147279438994271509
  books!:any[]
  errorMessage!:string

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getQueryParamResult()
  }

  getQueryParamResult(): void {
    console.log('getQueryResult()')
    this.bookService.getBookFromShelf(this.userId).subscribe(
      (books:any) => this.books = books,
      (error: any) => this.errorMessage = error as any);
  }
  getData() {
    console.log(this.books)
  }
}
