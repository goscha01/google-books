import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchQuery!:string


  constructor( private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
  }
  receiveQuery(query:string) {
    console.log('receiveQuery')
    console.log(query)
    this.searchQuery = query;
    this.bookService.query = query
    // this.getQueryParamResult(this.searchQuery)

  }

  navigation = ():void => {
    this.router.navigate(['/books']);
    console.log('navigation')
  }

}
