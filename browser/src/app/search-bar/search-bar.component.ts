import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() navigationFunction!: () => void;
  @Output() querySendingEvent = new EventEmitter<string>();

  errorMessage: string = 'A query should have at least 1 character!';
  books!:any[];
  searchQuery!:string;
  isInputValid:boolean=true

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // console.log('ngOnInit()')
    // this.getQueryParamResult(this.searchQuery)
    // this.sendQuery()

    }


    //Mthod to send data from Child SearchBar to Parent Books
  sendQuery() {
    // console.log('sendQuery search bar')
    this.querySendingEvent.emit(this.searchQuery);
    // console.log(this.searchQuery)
  }

  warning() {
    // console.log('error')
    this.searchQuery ? this.isInputValid = true : this.isInputValid =  false
    console.log(this.isInputValid)
  }
  // queryEmmit(value: string) {
  //   console.log('queryEmmit')
  //   console.log(value)
  //   this.searchQuery = value
  //   this.querySendingEvent.emit(value);
  // }

  onSubmit() {
    // console.log('onSubmit')
    // console.log(this.searchQuery)
    this.bookService.query = this.searchQuery
    this.warning()
    this.isInputValid === true? this.sendQuery() : null
    this.isInputValid === true? this.navigationFunction(): null //Navigates to Books from Home component
  }

  // // Parametirised query to server.js
  // getQueryParamResult(query: string): void {
  //   console.log(query)
  //   this.bookService.getBookQueryParam(query).subscribe(
  //     (books:any) => {
  //       this.books = (books.items? books.items : books) //depends on data structure from api or db
  //     console.log(this.books)},
  //     (error: any) => this.errorMessage = error as any);
  // }

  //test function
  // showServerResult() {
  //   console.log('showServerResult()')
  //   this.getQueryParamResult(this.searchQuery)
  //   console.log(this.books )
  // }

}
