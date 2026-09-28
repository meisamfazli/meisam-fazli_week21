# Warehouse Admin Panel

A modern Next.js admin panel for managing warehouse products. This project provides authentication, protected product management, filtering, pagination, and CRUD operations through a RESTful API.

## Features

- User registration and login
- JWT-based authentication
- Protected dashboard
- Product listing
- Add new products
- Edit existing products
- Delete products
- Product search and filtering
- Price range filtering
- Pagination
- Form validation
- Success and error notifications
- Responsive interface
- REST API integration
- Next.js App Router
- Clean component-based structure

## Technologies

### Frontend

- Next.js
- React
- JavaScript
- CSS
- Lucide React

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- REST API
- Swagger API Documentation

## Project Structure

```text
warehouse-admin-panel/
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── register/
│   │   │   └── page.jsx
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── assets/
│   ├── components/
│   ├── services/
│   ├── styles/
│   └── utils/
├── backend/
├── .env.example
├── eslint.config.js
├── package.json
└── README.md