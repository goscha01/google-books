import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookService } from './books/book.service';
import { BooksComponent } from './books/books.component';
import { BookTileComponent } from './book-tile/book-tile.component';
import { HomeComponent } from './home/home.component';
import { ShelfComponent } from './shelf/shelf.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookTileComponent,
    HomeComponent,
    ShelfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
