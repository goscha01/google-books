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

## UPDATE 2

Fixed some issues,  tried to deploy the app on AWS and create an automated pipeline. Succeded with manual server deployment and hosting of static build code on S3 calling the server.
Pipeline with Elastic Beanstalk still doesn't work.

### Instructions
To run the application you need:
# See the app deployed on AWS (delete function doesn't work though)
- go to http://google-book-build-uploaded.s3-website-us-east-1.amazonaws.com/
# OR install dependencies
- git clone https://github.com/goscha01/google-books
- cd google-books
- npm i
# AND run in a devevelopment mode
- npm run dev (runs server.js and ng serve simultaneously)
- go to localhost:4200
# OR manually run each application
- node/nodemon api/server.js
- cd browser
- npm start
- go to localhost:4200

# OR run in production mode (also problem with delete function)
- npm run build
- go to localhost:8080


