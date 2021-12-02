import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchQuery!: string;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {}
  receiveQuery(query: string) {
    this.searchQuery = query;
    this.bookService.query = query;
  }

  navigation = (): void => {
    this.router.navigate(['/books']);
  };


  checkAll(event: any) {
    console.log(event.target.checked)
    console.log("checked")
  }
}
