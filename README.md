\# Warehouse Admin Panel



A modern React-based admin panel for managing warehouse products. This project provides authentication, product management, filtering, pagination, and CRUD operations through a RESTful API.



\## Features



\* User registration and login

\* JWT-based authentication

\* Protected dashboard

\* Product listing

\* Add new products

\* Edit existing products

\* Delete products

\* Product search and filtering

\* Price range filtering

\* Pagination

\* Form validation

\* Success and error notifications

\* Responsive interface

\* REST API integration

\* Production-ready Vite build



\## Technologies



\### Frontend



\* React

\* React Router

\* Vite

\* JavaScript

\* CSS

\* Lucide React



\### Backend



\* Node.js

\* Express.js

\* JWT Authentication

\* bcrypt

\* REST API

\* Swagger API Documentation



\## Project Structure



```text

warehouse-admin-panel/

├── src/

│   ├── assets/

│   ├── components/

│   ├── pages/

│   ├── services/

│   ├── styles/

│   ├── utils/

│   ├── App.jsx

│   └── main.jsx

├── public/

├── package.json

└── vite.config.js

```



\## Getting Started



\### 1. Install dependencies



```bash

npm install

```



\### 2. Start the development server



```bash

npm run dev

```



The application will be available at:



```text

http://localhost:5173

```



\### 3. Start the backend



Make sure the backend API is running before using the application.



The default backend URL is:



```text

http://localhost:3000

```



\### 4. Build for production



```bash

npm run build

```



\### 5. Preview the production build



```bash

npm run preview

```



\## Authentication



Users can create an account through the registration page and then log in to access the protected product management dashboard.



Authentication uses JWT tokens stored on the client side.



\## Product Management



The dashboard allows authenticated users to:



\* View products

\* Search products by name

\* Filter products by price

\* Add products

\* Edit product information

\* Delete products

\* Navigate through product pages



\## API



The frontend communicates with the backend through REST API endpoints.



\### Authentication



```text

POST /auth/register

POST /auth/login

```



\### Products



```text

GET    /products

POST   /products

PUT    /products/:id

DELETE /products/:id

DELETE /products

```



Swagger API documentation is available at:



```text

http://localhost:3000/api-docs

```



\## Production Build



The project has been tested successfully with the Vite production build.



```bash

npm run build

```



The production files are generated in the `dist` directory.



\## License



This project was developed as a final academic project for educational purposes.



