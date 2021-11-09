import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';


@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.css']
})
export class BookTileComponent implements OnInit {

  @Input() bookItem: any;

  errorMessage!:string
  isFavoriteButtonClicked:boolean=false
  buttonLabel!:string
  isFavorite!:boolean

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.isFavorite = this.bookItem.favorit
    console.log('isFavorit ' + this.isFavorite)
    this.isFavorite? this.isFavoriteButtonClicked=true:this.isFavoriteButtonClicked=false
    console.log('buttonLabel ' + this.buttonLabel)
    // this.toggleButton()


  }
  addToLibrary(favBook:any) {
    console.log(this.isFavoriteButtonClicked)
    this.toggleButton()
    console.log(favBook)
    this.setLibraryFlag(favBook, this.isFavoriteButtonClicked)
    console.log('isFavorit ' + this.isFavorite)
  }

  toggleButton(){
    this.isFavoriteButtonClicked = !this.isFavoriteButtonClicked


  }

  setLibraryFlag(bookId: string, favFlag: boolean): void {
    console.log("setLibraryFlag()")
    // console.log(query)
    var qarr = [ favFlag, bookId]
    this.bookService.PutBookOnShelf(qarr).subscribe(
      (books:any) => {
        console.log(books[0].favorit)
        this.isFavorite = (books.items? books.items.id : books.bookid) //depends on data structure from api or db

    },
      (error: any) => this.errorMessage = error as any);
  }

}
