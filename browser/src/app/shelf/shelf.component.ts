import { Component, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css'],
})
export class ShelfComponent implements OnInit {
  sortoption!: string;
  books!: any[];
  errorMessage!: string;
  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.getAllBooksFromShelf();
  }

  //Get all books with favorite = true flag
  getAllBooksFromShelf() {
    this.bookService.GetBooksFromShelf().subscribe(
      (books: any) => this.books = books,
      (error: any) => this.errorMessage = error as any
      );}

  //update the shelf page after removing a book from the shelf
  updatePage() {
    this.getAllBooksFromShelf()
  }
}
