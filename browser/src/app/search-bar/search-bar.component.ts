import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Input() navigationFunction!: () => void;
  @Output() querySendingEvent = new EventEmitter<string>();

  errorMessage: string = 'A query should have at least 1 character!';
  books!: any[];
  searchQuery!: string;
  isInputValid: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  //Sending data from Child SearchBar to Parent Books
  sendQuery() {
    this.querySendingEvent.emit(this.searchQuery);
  }

  //search bar validation
  warning() {
    this.searchQuery ? (this.isInputValid = true) : (this.isInputValid = false);
    console.log(this.isInputValid);
  }

  onSubmit() {
    this.bookService.query = this.searchQuery;
    this.warning();
    this.isInputValid === true ? this.sendQuery() : null;
    this.isInputValid === true ? this.navigationFunction() : null; //Navigates to Books from Home component
  }
}
