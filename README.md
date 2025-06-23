# Library Management System API

## Overview

This is a Library Management System API built using **Express**, **TypeScript**, and **MongoDB** (via **Mongoose**). The API allows you to perform operations such as managing books, borrowing books, and retrieving summaries of borrowed books. It includes validation, error handling, and uses aggregation pipelines for reporting purposes.

## Features

- **CRUD operations** for managing books.
- **Borrowing** books with availability checks.
- **Borrowed Books Summary** using MongoDB aggregation.
- **Validation** for all inputs, including ISBN uniqueness, copies, and availability.
- **Business logic enforcement** for book availability based on copies.
- **Error handling** and well-defined responses.

---

## Setup and Installation

### Prerequisites

Before running the application, ensure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (either locally or use a MongoDB Atlas cloud instance)

### Step 1: Clone the Repository

Clone the repository to your local machine:

```
git clone https://github.com/rubelrana123/Library-management.git

cd Library-management-server
```

### Step 2: Install Dependencies

Install the required dependencies using npm or yarn:

```
npm install
```

### Step 3: Configure MongoDB
Make sure you have a MongoDB instance running locally or use a MongoDB Atlas cluster.

Create a .env file in the root of the project and add your MongoDB connection string:
```
MONGO_URI=mongodb://localhost:27017/library_db  # Replace with your MongoDB URI
PORT=5000  # Port the server will run on
```

### Step 4: Run the Server
Start the application:
```
npm run dev
```
This will run the API server at http://localhost:5000

### API Endpoints
1. Create a Book
POST /api/books

Request body:
```
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
Response:
```
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
### 2. Get All Books
GET /api/books

Query Parameters:

```filter```: Filter books by genre (e.g., ```SCIENCE```, ```FICTION```).

```sortBy```: Field to sort by (e.g., ```createdAt```).

```sort```: Sorting direction (```asc``` or ```desc```).

```limit```: Number of results to return.

Example request: ```/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5```

Response:
```
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```
### 3. Get Book by ID
GET /api/books/:bookId

Response:
```
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 4. Update a Book
PUT /api/books/:bookId

Request body:
```
{
  "copies": 50
}
```
Response:
```
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

### 5. Delete a Book
DELETE /api/books/:bookId

Response:
```
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

### 6. Borrow a Book
POST /api/borrow

Request body:
```
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
Response:
```
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

### 7. Borrowed Books Summary (Aggregation)
GET /api/borrow

Response:
```
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

### Error Handling
All API responses follow a consistent structure for error handling:

Validation Errors: Returned for invalid inputs.

MongoDB Errors: Specifically for duplicate key errors (e.g., duplicate ISBN).

General Errors: For any unforeseen issues.

Error responses are structured as follows:
```
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```
