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
  books!:any[];
  searchQuery!:string;
  recomendedQuery:string = 'flowers'
  isInitialQueryEmpty: boolean = true;

  constructor(private bookService: BookService) {
    // console.log("constructor")
    this.searchQuery = this.bookService.query
    this.searchQuery? this.isInitialQueryEmpty=false:this.isInitialQueryEmpty=true
    // console.log(this.searchQuery)
  }

  ngOnInit(): void {
    //  console.log("ngOnInit()")
    //  console.log(this.isInitialQueryEmpty)
     this.isInitialQueryEmpty?
     this.getQueryParamResult(this.recomendedQuery):
     this.getQueryParamResult(this.searchQuery)
  // this.showServerResult()



  }

   receiveQuery(query:string) {
    // console.log('receiveQuery')
    // console.log(query)
    this.isInitialQueryEmpty = false
    this.bookService.query = query
    this.searchQuery = this.bookService.query;
    this.getQueryParamResult(this.searchQuery)

  }


    // Parametirised query to server.js
    getQueryParamResult(query: string): void {
      // console.log("getQueryParamResult()")
      // console.log(query)
      this.bookService.getBookQueryParam(query).subscribe(
        (books:any) => {
          this.books = (books.items? books.items : books) //depends on data structure from api or db
        console.log(this.books)},
        (error: any) => this.errorMessage = error as any);
    }

  showServerResult() {
    console.log('showServerResult()')
    this.getQueryParamResult(this.searchQuery)
    this.books = this.bookService.qureyData
    // console.log(this.books )
  }

  dummy() {} //empty function because I need to pass something into search-bar conmponent. Find s;ution later

}
