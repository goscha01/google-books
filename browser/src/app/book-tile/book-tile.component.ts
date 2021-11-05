import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.css']
})
export class BookTileComponent implements OnInit {

  @Input() bookItem: any;


  constructor() { }

  ngOnInit(): void {

  }



}
