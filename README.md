# Graphql-assignment

A small Express server that serves a GraphQL API over in-memory book and author data, with GraphiQL enabled for trying queries in the browser.

**Status:** Working demo. The server starts, serves a GraphQL endpoint at `/graphql` with book and author queries, and runs from the code in the repo, but it is not deployed and its data resets on every restart. Mutations are defined but not exposed (see below).

## The problem

This is a teaching-style exercise for GraphQL on Node. It models books and their authors, lets a client ask for a book or author and follow the relationship between them (an author's books, a book's author id), and shows how a schema is built with `graphql-js` on top of Express.

## What it does

- **Queries (`src/datalayer/root/Types.js`)**: `book(id)`, `books`, `authors`, and `author(id)`.
- **Relationships (`src/models/models.js`)**: the `Author` type resolves its `books` field by filtering the book list on `authorId`.
- **GraphiQL**: the `/graphql` endpoint is served with `graphiql: true`, so queries can be run from a browser.
- **Static folder**: `/static` serves the `public/` folder, which currently holds Font Awesome font files.
- **Health route**: `GET /` returns "hello world".

## How it's built

- **Server**: Express 4 with `express-graphql` 0.12, `graphql` 14, `cors` and `dotenv`. The port comes from `PORT` and defaults to 9000.
- **Data**: arrays of books and authors in `src/datalayer/books/Books.js` and `src/datalayer/author/Authors.js`. There is no database.
- **Layout**: types and resolvers are split into `datalayer/` (data and root types) and `models/` (object types), and `schema/schema.js` assembles the schema.

## Running it locally

```bash
npm install
npm run dev     # nodemon src/server.js
npm start       # node src/server.js
```

Then open `http://localhost:9000/graphql` to use GraphiQL.

## What's left

- Mutations are not working. `Types.js` defines `addBook` and `addAuthor` on a `Mutation` type, but the file ends with `module.exports = RootQueryType`, so the mutation type is never exported. `schema/schema.js` then uses the query type as its mutation root, so no mutations are available.
- Even if the mutations were exported, new books and authors would only live in memory until the server restarts.
- The data is hard-coded and small: three authors and a short list of books.
- `express-graphql` and `graphql` are older major versions, and the dev dependency `nodemon` is 1.x.
- There are no tests.
