import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTileComponent } from './book-tile/book-tile.component';
import { BooksComponent } from './books/books.component';
import { DbTableComponent } from './db-table/db-table.component';
import { HomeComponent } from './home/home.component';
import { ShelfComponent } from './shelf/shelf.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'tile', component: BookTileComponent },
  { path: 'shelf', component: ShelfComponent },
  { path: 'database', component: DbTableComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
