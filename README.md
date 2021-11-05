# A Big Stack of Google Books

![](https://i.imgflip.com/4c9scu.jpg)

Just kidding, we believe ya.

This challenge is an opportunity to show off your skills across the entire stack. You'll build a
rudimentary search engine that falls back to Google Books. Your front end will take in queries and
display results. Your back end receives those queries and either returns a stored result (for
previously submitted queries) or makes a call to the Google Books API.

## Instructions
- Clone this repository and complete the challenge according to the Requirements below.
- Once finished, email your [patch](https://robots.thoughtbot.com/send-a-patch-to-someone-using-git-format-patch) to jobs+dev@docnetwork.org and we will review your submission. **Do _not_ open a pull request.**

## Notes

**Design is important.**

Be it API-level or visual, design is important. We value code that's easy to use and maintain. We value
appealing, user-centric interfaces. We don't value compromise on this topic—show us what you've got!

Efficiency is also important. Feel free to use UI Frameworks/Component Libraries such as Vuetify or
MaterialUI to actualize your good Frontend designs. Similaraly, you're welcome to use an ORM or
other Backend module to facilitate efficent, well designed Backend code.

**You are encouraged (but not required) to use ES6+ JavaScript.**

We use a lot of ES6+ JS at DocNetwork. We will be testing your submission with the latest versions
of Chrome and Firefox. We'll run your server with Node 10.X (unless otherwise specified). You're
welcome to use any front end build system that your chosen framework (see requirements) supports so
long as we can build it easily by following your instructions.

## Requirements
- General
  - All code must be your own. Do not plagiarize, copy, or steal code.
  - Research the [Google Books Volume
    API](https://developers.google.com/books/docs/v1/reference/volumes) to determine how to search
    for books given a query.
  - Create an [API key](https://developers.google.com/books/docs/v1/using#APIKey). Keys are not
    required for making requests to the Google API, but supporting them is required for this
    challenge.
    - Security is important, so don't send us your Books API key! The key should be loaded in
      through an external file that is not included in your patch.
  - Include instructions for a reviewer to set up and use your application. This could be scripts,
    migration files, or just plain text describing the schema and required steps to get everything
    running.
- API
  - Must use the `express` server framework (included)
  - Must use a database of some type
    - We've included the `pg` package, but you can use any SQL or NoSQL database engine.
  - Implement an API route that accepts a search query, passes that along to the Books API (using a
    utility such as [https](https://nodejs.org/api/https.html),
    [axios](https://www.npmjs.com/package/axios), or
    [request](https://www.npmjs.com/package/request) to name a few), and responds with a collection
    of book results in a JSON format that includes the following details:
    - Title
    - Subtitle
    - Authors
    - Description (First 140 characters)
    - Categories
    - Publisher
    - Published Date
    - Preview Link
    - Cover Image (URL)
  - Each query should store the search query and associated responses. Entries should include all of
    the above information as well as a timestamp of when the entry was created.
  - When a search is run using a query that's already stored in your DB, return the results from
    your DB. If no existing match is found, continue with the Books API call and return those
    results as usual.
- Browser
  - We've included a Vue CLI project as a starter for your front end
      - Vue is preferred, but you don't have to use it. Other options include:
        - AngularJS (our legacy framework)
        - React
        - Angular
        - Vanilla JS
      - You may _not_ use jQuery
      - If you choose another framework, update the build scripts accordingly
  - There should be a search bar to input a query.
  - The results should be rendered in the results area. You must include these fields (if available for the record):
    - Cover Image
    - Title
    - Subtitle
    - Authors
    - Preview Link
    - Any other information as you see fit
  - Each subsequent query should append or prepend its results to the results area.
  - There must be no duplicates (by Google Books id).
  - The results should be visually appealing, styled logically, and fully responsive for mobile
    devices.

### Resources
- NodeJS https://nodejs.org/en/
- ExpressJS https://expressjs.com/
- PostgreSQL https://www.postgresql.org/docs/, https://node-postgres.com/
- Google Books API https://developers.google.com/books/docs/v1/reference/
- DocNetwork! If you have any questions about the specifications or implementation, feel free to reach out to us. It will not count against your final review, and may even end up being a plus.
