# joi-validator-middleware

A reusable Joi validation middleware for Node.js applications built with Express.js. This middleware simplifies request validation by mapping HTTP methods to appropriate validation schemas.

---

## Features

- Validates incoming requests (`GET`, `POST`, `PUT`, `DELETE`) using Joi schemas.
- Automatically handles validation errors and formats them for easier debugging.
- Lightweight and easy to integrate with any Express.js application.
- Includes TypeScript type definitions for better developer experience.

---

## Installation

```bash
npm install joi-validator-middleware
```
---

##  Usage

```js
const express = require('express');
const Joi = require('joi');
const validate = require('joi-validator-middleware');

const app = express();
app.use(express.json());

const schema = {
  createUser: {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
    }),
    body: Joi.object({
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }
};

app.post('/register', validate(schema.createUser), (req, res) => {
  res.send({ message: 'Data is valid!' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
```
