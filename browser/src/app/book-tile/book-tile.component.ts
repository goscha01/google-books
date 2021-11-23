import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.css'],
})
export class BookTileComponent implements OnInit {
  @Input() bookItem: any;
  @Output() removeBookFromShelf = new EventEmitter<any>();

  errorMessage!: string;
  isFavorite!: boolean;
  defaultCover: any = 'assets/bookcover.png';
  buttonValue!:string;
  buttonColor!:string;
  textlength!:number;
  innerWidth!:number;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.isFavorite = this.bookItem.favorite
    this.toggleButton()
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;

    if(this.innerWidth < 460) {
      this.textlength = 100
    } else if(this.innerWidth < 860) {
      this.textlength = 300
    } else {
      this.textlength = 500
    }
  }

  toggleButton() {
    console.log('toggleButton')
    if(this.isFavorite) {
      this.buttonValue = 'Remove from Library';
      this.buttonColor = 'btn-warning';
      } else {
      this.buttonValue = 'Add to Library';
      this.buttonColor = 'btn-outline-secondary' ;
    }

  }

  setLibraryFlag(bookId: string): void {
    this.isFavorite = !this.isFavorite
    var qarr = [this.isFavorite, bookId];
    this.bookService.setFlag(qarr).subscribe(
      (favorite: any) => {
        this.isFavorite = favorite;
        this.removeBookFromShelf.emit()
      },
      (error: any) => (this.errorMessage = error as any)
    );
    this.toggleButton()


  }

}
