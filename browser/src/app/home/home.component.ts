import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  defaultBook:any = "testBook";
  errorMessage!: string;
  searchQuery:String = '';
  books!:any[];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
  }

  showServerResult() {
    console.log('showServerResult')
    console.log(this.searchQuery)

  }

  onSubmit() {
    console.log('onSubmit')
    this.router.navigate(['/books']);
    this.showServerResult()
     }
}
