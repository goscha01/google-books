# A Big Stack of Google Books

The app calls GoogleBook API with search words and renders books on the book page. During the API fetching books are stored in remote Postgres DB, so if the next time the same search query is sent, books are provided from the DB. All books, which are in DB at the moment can be seen and sorted on the Database page. If there is no search word provided on the home page, a warning message appears. If no query on the Books page, the suggested books are displayed on a 'flowers' query. Books can be deleted from the DB. A user can mark a favorite book, so it will be placed on 'shelf and be seen on the Bookshelf page.

## WARNING!!!!

The project is in development and the code is very dirty and isn't refactored. Also, responsive design is not implemented. I need 1 day more at least to refactor the code and maybe finish the design.

## UPDATE 

Refactored and cleaned the code. Tested the app. Here is the list of bugs, workarounds, and uncomplete features: 
- authors and categories - not arrays
- DB is one-to-many needs normalization to avoid duplicates 
- server implementation needs more refactoring, especially axiosCall function, and data-mapping as well connection to DB
- const conString = process.env.POSTGRES_URL   doesn't work with pool
- problem with datastamp format
- db-table component - change reload to rerender 
- shelf component has to rerender after changing the favorite flag
- check if DB has duplicates 
- still not responsive design
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


