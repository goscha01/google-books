# A Big Stack of Google Books

The app calls GoogleBook API with search words and renders books on the book page. During the API fetching books are stored in remote Postgres DB, so if the next time the same search query is sent, books are provided from the DB. All books, which are in DB at the moment can be seen and sorted on the Database page. If there is no search word provided on the home page, a warning message appears. If no query on the Books page, the suggested books are displayed on a 'flowers' query. Books can be deleted from the DB. A user can mark a favorite book, so it will be placed on 'shelf and be seen on the Bookshelf page.

## WARNING!!!!

The project is in development and the code is very dirty and isn't refactored. Also, responsive design is not implemented. I need 1 day more at least to refactor the code and maybe finish the design.


### Instructions
To run the application you need:
- git clone https://github.com/goscha01/google-books
- cd google-books
- npm i
- cd browser
- npm i
- cd ..
- npm run dev (runs server.js and ng serve simultaneously)
or
- node/nodemon api/server.js
- cd browser
- npm start


