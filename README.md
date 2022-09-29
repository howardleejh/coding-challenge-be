

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Coding Challenge Backend API</h3>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a coding challenge to build a full stack web app to allow users to manage collections and products.

### Built With

* Express JS
* Node JS
* Javascript

<!-- GETTING STARTED -->
## Getting Started

Please follow the following instructions if you are to fork this project. Alternatively you may use Postman with the Routes table provided.

### Prerequisites

Please ensure you have the following: NPM and NODE
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/howardleejh/coding-challenge-be.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a .env file in root folder.
   
5. Enter all inputs provided in .env.sample in `.env.sample`
   ```js
   const KEY = 'ENTER YOUR VALUE';
   ```

<!--  API ROUTES -->
## API Routes

### Users

| **URL** | **Method** | **Actions** |
|------------|-------------|------------|
| /api/v1/register        | GET | registers a user
| /api/v1/login     | POST | login user
| /api/v1/profile    | PATCH | updates an existing user account
| /api/v1/profile   | DELETE | deletes an existing user account      
| /api/v1/profile  | GET | gets an existing user profile
| /api/v1/user-id      | GET | looks for a user with account id

<br />

### Products

| **URL** | **Method** | **Actions** |
|------------|-------------|------------|
| /api/v1/products | GET | display all products
| /api/v1/products/create | POST | create a product
| /api/v1/products/update | PATCH | updates an existing product
| /api/v1/products/:sku | DELETE | deletes an existing product with SKU  
| /api/v1/products/filter | GET | filters for an existing product with query params
| /api/v1/users/products/:sku | GET | displays a product with SKU with route params

<br />

<!-- LICENSE -->
## License

None.
