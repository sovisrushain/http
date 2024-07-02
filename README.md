# REST API - NodeJS + PostgreSQL

## Overview
This is a simple CRUD application built with Node.js, Express and PostgreSQL. The application manages products and categories, allowing you to perform basic operations on these entities.

## Database Schema
The application uses the following database schema:
```angular2html
CREATE TABLE category (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE,
    created_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_date TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE product (
id SERIAL NOT NULL PRIMARY KEY,
name VARCHAR(120) NOT NULL,
description TEXT,
price NUMERIC(10,2) NOT NULL,
currency VARCHAR(5) NOT NULL DEFAULT 'LKR',
quantity INTEGER NOT NULL DEFAULT 0,
active BOOLEAN NOT NULL DEFAULT true,
category_id INTEGER NOT NULL REFERENCES category(id),
created_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
updated_date TIMESTAMP NOT NULL DEFAULT current_timestamp
);
```

## Prerequisites
- Node.js
- PostgreSQL

## Set Up
Clone the repository:
```angular2html
git clone https://github.com/sovisrushain/node-express-postgresql-crud.git
cd node-express-postgresql-crud
```
Install the dependencies:
```angular2html
npm install
```
Change your database connection details:
```angular2html
host: '',
user: '',
password: '',
database: '',
port: 5432
```
Ensure your PostgreSQL server is running.

Run the SQL scripts to create the necessary tables.

Start the server:
```angular2html
npm start
```

The application should now be running on http://localhost:3000.

## License
This project is licensed under the MIT License.
