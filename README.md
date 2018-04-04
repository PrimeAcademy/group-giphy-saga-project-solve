# Redux Saga Garden

An epic garden

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `garden` and create a `plant` table and add a few plants to your garden:

```SQL
CREATE TABLE plant (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    kingdom VARCHAR (100),
    clade VARCHAR (100),
    order VARCHAR (100),
    family VARCHAR (100),
    subfamily VARCHAR (100),
    genus VARCHAR (100)
);

INSERT INTO plant ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")
('Rose', 'Plantae', 'Angiosperms', 'Rosales', 'Rosaceae', 'Rosoideae', 'Rosa'),
('Tulip', 'Plantae', 'Angiosperms', 'Liliales', 'Liliaceae', 'Lilieae', 'Tulipa'),
('Oak', 'Plantae', 'Angiosperms', 'Fagales', 'Fagaceae', NULL, 'Quercus');
```

## Development Setup Instructions

* Run `npm install`
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run dev`
* Navigate to `localhost:3000`

## Production Build

This is the build Heroku will run, but during development, you will likely not need to use it.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Base Mode

1. The route `http://localhost:5000/api/plant` returns an array of plants. Display that array on the `Garden` component on load.
1. Implement redux-saga so the api get request is happening in a saga (not in a component).
1. Add a form that allows adding a new plant to the database. The server `post` route to do this is available at `http://localhost:5000/api/plant`.
1. Add a `Delete` button for each plant to allow it to be removed from the database. The server `delete` route to do this is available at `http://localhost:5000/api/plant`, and it requires `req.query.id` to be an `id` from the database.

## Hard Mode

1. Make the list editable (use inputs) and add a `Save` button for each plant to allow it to be updated in the database. The server `delete` route to do this is available at `http://localhost:5000/api/plant`, and it requires `req.query.id` to be an `id` from the database.
1. Use `react-router` so that when a user navigates to `http://localhost:3000/plant/1` it displays the details for a given plant. The server `get` route to do this is available at `http://localhost:5000/api/plant/1`.
1. Make the individual plant page editable (use inputs) and add a `save` button for each plant to allow it to be edited in the database.

## Stretch Mode

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Herkoku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. In the deploy section, select manual deploy
