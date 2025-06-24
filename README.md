# 📚 Library Management Server

A powerful backend API for managing a library system, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. This server handles books and borrowing logic with robust validation, business rules, and data aggregation.



---

## 🌐 Live Demo

- **API:** [https://libary-managment.vercel.app/](https://libary-managment.vercel.app/)
- **Video Explanation:** [ Demo](https://www.loom.com/share/90b206e371ad4f0599a4b0a3b59ca538?sid=ceef0fad-f71e-4f9b-b5ff-a506bdbbee8c)

---

## 🚀 Goal

- Book CRUD operations
- Borrowing system with availability check
- Auto-updated book availability status
- Borrowed books summary using MongoDB Aggregation
- Filtering & sorting capabilities for book list
- Full validation and custom error handling

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose 
- **Others:**
  - ESLint
  - dotenv

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Steps

```bash
# 1. Clone the repo
$ git clone https://github.com/rubelrana123/libary-managment
$ cd library-management 

# 2. Install dependencies
$ npm install

# 3. Create .env file
$ touch .env
```

#### demo `.env`:

```
PORT=4\5000
DB_NAME=your_db_name
DB_PASSWORD=your_password
```

### Run Server

```bash
npm run dev
```

---

## 📁 Folder Structure

```
LIBRARY-MANAGEMENT/
├── src/
│   ├── config/           # environment config
│   ├── controllers/      # Route handlers and  Business logic
│   ├── middlewares/      # Error & request handling
│   ├── models/           # Mongoose schemas & methods
│   ├── routes/           # API routes 
│   ├── app.ts            # Express config
│   └── server.ts         # Entry point & DB Connection
├── .env
├── tsconfig.json
├── vercel.json
...
```
---

## ✅ Validations

### Book Schema

| Field         | Type    | Required | Validation                                                          |
| ------------- | ------- | -------- | ------------------------------------------------------------------- |
| `title`       | string  | Yes      | —                                                                   |
| `author`      | string  | Yes      | —                                                                   |
| `genre`       | enum    | Yes      | One of: FICTION, NON\_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY |
| `isbn`        | string  | Yes      | Unique ISBN enforced in DB                                          |
| `description` | string  | No       | Optional                                                            |
| `copies`      | number  | Yes      | Integer ≥ 0                                                         |
| `available`   | boolean | No       | Optional, defaults to true                                          |

### Borrow Schema

| Field      | Type     | Required | Validation           |
| ---------- | -------- | -------- | -------------------- |
| `book`     | ObjectId | Yes      | Must be a valid book |
| `quantity` | number   | Yes      | Must be positive     |
| `dueDate`  | Date     | Yes      | Future date required |

---

## 🧪 Error Handling

All errors follow a consistent format:

### Validation Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min",
        "value": -5
      }
    }
  }
}
```

---
---

## 🔌 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### 1. 📘 Create a Book

**POST** `/api/books`

```json
{
  "title": "Man IS Mortal",
  "author": "Tara Westover",
  "genre": "BIOGRAPHY",
  "isbn": "123456789755",
  "description": "A memoir about growing up in a strict and abusive household.",
  "copies": 2,
 
   }
```

### 2. 📚 Get All Books

**GET** `/api/books`

Supports Query Parameters:

- `filter` (genre)
- `sortBy` (e.g., createdAt)
- `sort` (asc | desc)
- `limit` (number of items)

Example: `/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

### 3. 🔍 Get Book by ID

**GET** `/api/books/:bookId`

### 4. ✏️ Update Book

**Patch** `/api/books/:bookId`

```json
{
  "copies": 50
}
```

### 5. ❌ Delete Book

**DELETE** `/api/books/:bookId`

### 6. 📖 Borrow Book

**POST** `/api/borrow`

```json
{
  "book": "685ab2332b7d0f28c18b1c05",
  "quantity": 3,
  "dueDate": "2025-07-28T00:00:00.000Z"
}
```

Business Logic:

- Quantity must be <= available copies
- Deduct copies automatically
- If copies === 0, set available = false

### 7. 📊 Borrowed Book Summary

**GET** `/api/borrow`

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```
## 👨‍💻 Author

**Rubel Rana**\
Front Stack Developer\
[🔗 LinkedIn](https://www.linkedin.com/in/rubelrana123) • [💻 HackerRank](https://www.hackerrank.com/profile/rubelrana123)
