import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTileComponent } from './book-tile/book-tile.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { ShelfComponent } from './shelf/shelf.component';

const routes: Routes = [
{path:'', redirectTo: 'home', pathMatch: 'full'},
{path:'home', component: HomeComponent},
{path:'books', component: BooksComponent},
{path:'tile', component: BookTileComponent},
{path:'shelf', component: ShelfComponent},
// {path:'register', loadChildren: () => import('./registration/registration.module')
// .then(m => m.RegistrationModule)},
// {path:'**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
