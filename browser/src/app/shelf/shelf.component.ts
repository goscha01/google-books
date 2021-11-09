import { Component, OnInit } from '@angular/core';
import { Book } from '../books/book';
import { BookService } from '../books/book.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {
  sortoption: string = '';
  userId=106147279438994271509
  books!:any[]
  errorMessage!:string
  query:string='Flower'
  testBook:Book =  {
    "title": "The Flower Book",
    "subtitle": "Let the Beauty of Each Bloom Speak for Itself",
    "authors": ["Rachel Siegfried"],
    "description" : "The Flower Book explores 60 flowers, bloom-by-bloom in stunning portraiture. Lush macrophotography allows readers to see the details of each featured flower up close, from the amaryllis in spring, snapdragon in summer, and dahlia in fall to tropical wonders such as orchids and more. Intimate portraits of each flower include quick-reference profiles with tips for choosing the best blooms, care for cut stems, arranging recommendations, colors, shapes, and even growing tips to transform the home, from yard to tabletop. Gorgeous photographs throughout spotlight 30 sample floral arrangements that show how to design and build custom floral arrangements using featured blooms. Plus, a step-by-step techniques section walks beginners through the basics of foliage and fillers, bouquets, and arrangements to make this book as practical as it is beautiful. The Flower Book celebrates all the wonderful qualities of flowers-their sheer beauty, infinite variety, and power to evoke admiration-bloom by exquisite bloom.",
    "categories": ["Nature"],
    "pablisher": "Penguin",
    "publisherDate": "2017-02-07",
    "previewLink": "http://books.google.com/books?id=WVLXDwAAQBAJ&printsec=frontcover&dq=flower&hl=&cd=1&source=gbs_api",
    "coverImage": "http://books.google.com/books/content?id=WVLXDwAAQ…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
  }
  bothData!:any[]

  testBook2:any[] = ['The Flower Book5', 'Let the Beauty of Each Bloom Speak for Itself', 'Rachel Siegfried', 'The Flower Book explores 60 flowers, bloom-by-bloom in stunning portraiture. Lush macrophotography allows readers to see the details of each featured flower up close, from the amaryllis in spring, snapdragon in summer, and dahlia in fall to tropical wonders such as orchids and more. Intimate portraits of each flower include quick-reference profiles with tips for choosing the best blooms, care for cut stems, arranging recommendations, colors, shapes, and even growing tips to transform the home, from yard to tabletop. Gorgeous photographs throughout spotlight 30 sample floral arrangements that show how to design and build custom floral arrangements using featured blooms. Plus, a step-by-step techniques section walks beginners through the basics of foliage and fillers, bouquets, and arrangements to make this book as practical as it is beautiful. The Flower Book celebrates all the wonderful qualities of flowers-their sheer beauty, infinite variety, and power to evoke admiration-bloom by exquisite bloom.', 'Nature', 'Penguin', '2017-02-07', 'http://books.google.com/books?id=WVLXDwAAQBAJ&printsec=frontcover&dq=flower&hl=&cd=1&source=gbs_api', 'http://books.google.com/books/content?id=WVLXDwAAQ…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api']

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooksFromShelf()
  }

  getAllBooksFromShelf() {
    console.log('getAllBooksFromShelf()')
    this.bookService.GetBooksFromShelf().subscribe(
      (books:any) => this.books = books,
      (error: any) => this.errorMessage = error as any);

  }
  getQueryParamResult(): void {
    console.log('getQueryResult()')
    this.bookService.getBooksFromDB().subscribe(
      (books:any) => this.books = books,
      (error: any) => this.errorMessage = error as any);
  }
  getData() {

    this.bookService.getDataFromBoth().subscribe(
      (books:any) => this.bothData = books,
      (error: any) => this.errorMessage = error as any);
      console.log(this.bothData[0])
      console.log(this.bothData[1])
  }

  putData() {
    console.log('PutData()')
    this.bookService.PutBookOnShelf('this.testBook2').subscribe(
      (books:any) => this.books = books,
      (error: any) => this.errorMessage = error as any);
      window.location.reload(); //remove or change for hook
  }

  deleteData() {
    console.log('deleteBookOnShelf()')
    this.bookService.deleteBookOnShelf().subscribe(
      (books:any) => this.books = books,
      (error: any) => this.errorMessage = error as any);
      window.location.reload(); //remove or change for hook
  }

  deleteAllData() {
    this.bookService.deleteAllOnShelf().subscribe(
      (books:any) => this.books = books,
      (error: any) => this.errorMessage = error as any);
      window.location.reload(); //remove or change for hook
  }
}
