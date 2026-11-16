# Mongoose Express Middleware API

A RESTful API built with **Node.js**, **Express**, and **Mongoose** that stores data in **MongoDB** and uses a modular middleware stack for logging, authentication, rate limiting, and error handling.

## Features

- Full CRUD operations with MongoDB persistence
- Mongoose schema validation
- Custom request logger (method, URL, status, response time)
- API key authentication on write routes
- Rate limiting to prevent abuse
- Security headers (Helmet) and CORS support
- ObjectId validation middleware
- Centralized error handler for Mongoose errors
- 404 handler for unknown routes
- Environment-based configuration
- Deployment-ready (dynamic port support)

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- helmet, cors, express-rate-limit
- dotenv

## Project Structure

```
mongoose-express-middleware-api/
├── middleware/
│   ├── logger.js
│   ├── auth.js
│   ├── validateId.js
│   ├── rateLimiter.js
│   ├── notFound.js
│   └── errorHandler.js
├── models/
│   └── Item.js
├── routes/
│   └── items.js
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm
- A MongoDB database (local or free MongoDB Atlas cluster)
