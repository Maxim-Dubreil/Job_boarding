Job Board Backend - README
Overview
This is a Job Board backend built with Node.js, Express, Sequelize, and MySQL. The backend allows for managing users, companies, job offers, and applications, with features like authentication and CRUD operations.
Prerequisites
Before you begin, ensure you have the following tools installed:
Node.js: Download Node.js
MySQL: Download MySQL
Git: Download Git
Postman or Insomnia (optional): For testing API endpoints.
Getting Started
Step 1: Clone the Repository

git clone https://github.com/your-repository/jobboard_backend.git
cd jobboard_backend

Step 2: Install Dependencies
Install project dependencies by running:

npm install

Sequelize and Nodemon should also be installed for development purposes:

npm install --save sequelize-cli nodemon

Step 3: Configure the Environment
Create a .env file in the root directory with the following content:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=jobboard_db
DB_PORT=3306
JWT_SECRET=YourJWTSecret

Replace your_password_here with your MySQL root password if you have one.
Step 4: Set Up the MySQL Database
Open MySQL Workbench or the MySQL CLI and create a database:

CREATE DATABASE jobboard_db;

Alternatively, use another name, but ensure that your .env file reflects this name.
Step 5: Set Up Sequelize and Migrate the Database
Run Sequelize migrations to set up the database tables:

npx sequelize-cli db:migrate

This will create the necessary tables in your database.
Step 6: Seed the Database
If you have seed files to populate the database with initial data (e.g., companies, users, or job offers), run the seeder:

npx sequelize-cli db:seed:all

This will insert the seed data into the relevant tables.
Step 7: Start the Development Server
Start the server using Nodemon for automatic restarts during development:

npm run dev

You should see output like:

Serveur démarré sur le port 5000

This means the backend is now running at http://localhost:5000.
Step 8: Test the API Endpoints
Use Postman, Insomnia, or any API client to interact with the API.
Example API Endpoints
Signup User:
POST /api/users/signup
Request body (JSON):

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}


Login User:
POST /api/users/login
Request body (JSON):

{
  "email": "johndoe@example.com",
  "password": "password123"
}


Create Job Offer (Authenticated):
POST /api/offres
Headers:
Authorization: Bearer <your_jwt_token>
Request body (JSON):


{
  "title": "Full Stack Developer",
  "description": "Job description here...",
  "salary": 45000,
  "location": "Paris"
}


View All Job Offers:
GET /api/offres
Step 9: Access the Database
You can manage and view the database using MySQL Workbench or another MySQL client. Use the credentials in the .env file to connect to your MySQL server.
Project Structure
server.js: The entry point of the application.
config/: Contains the database configuration for Sequelize.
routes/: Contains the Express routes for users, companies, job offers, and applications.
controllers/: Contains the logic for handling requests.
models/: Contains Sequelize models that define the MySQL tables.
seeders/: Contains seed files to populate the database with initial data.
middlewares/: Contains middleware like JWT authentication.
Commands
Start the server:

npm start
This runs the server using Node.js.
Run in development mode:

npm run dev
This runs the server using Nodemon, which automatically reloads on file changes.
Run migrations:

npx sequelize-cli db:migrate
This applies migrations to the database.
Run seeders:

npx sequelize-cli db:seed:all
This populates the database with seed data.
Troubleshooting
Error: Sequelize CLI not found:
If npx sequelize-cli is not recognized, ensure you've run npm install --save sequelize-cli.
Server won’t start:
Ensure your .env file is correctly configured and your MySQL server is running.
JWT Authentication Issues:
Ensure you have set JWT_SECRET in your .env file.
Conclusion
By following these steps, you should be able to set up and run the Job Board backend locally. Feel free to customize the backend or start building the frontend to interact with this API.
Happy coding!

