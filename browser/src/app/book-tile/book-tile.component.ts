import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.css'],
})
export class BookTileComponent implements OnInit {
  @Input() bookItem: any;

  errorMessage!: string;
  isFavoriteButtonClicked: boolean = false;
  buttonLabel!: string;
  isFavorite!: boolean;
  defaultCover: any = 'assets/bookcover.png';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.isFavorite = this.bookItem.favorite;
    this.isFavorite
      ? (this.isFavoriteButtonClicked = true)
      : (this.isFavoriteButtonClicked = false);
  }
  addToLibrary(favBook: any) {
    this.toggleButton();
    this.setLibraryFlag(favBook, this.isFavoriteButtonClicked);
  }

  toggleButton() {
    this.isFavoriteButtonClicked = !this.isFavoriteButtonClicked;
  }

  setLibraryFlag(bookId: string, favFlag: boolean): void {
    var qarr = [favFlag, bookId];
    this.bookService.PutBookOnShelf(qarr).subscribe(
      (favorite: any) => {
        this.isFavorite = favorite.bookid;
      },
      (error: any) => (this.errorMessage = error as any)
    );
  }
}
