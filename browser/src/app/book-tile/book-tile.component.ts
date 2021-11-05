import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.css']
})
export class BookTileComponent implements OnInit {

  @Input() bookName: any;

  allBooks!:any;
  errorMessage!:string;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.ShowAllBooks()

  }

  ShowAllBooks() {
      this.bookService.getFullBookData().subscribe(
      (book: any) => this.allBooks = book,
      (error: any) => this.errorMessage = error as any)

  }

}
