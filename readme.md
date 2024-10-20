Job Board - General README

Overview
This is a Job Board project consisting of two parts:
Backend: Built with Node.js, Express, Sequelize, and MySQL. It provides a RESTful API for managing users, companies, job offers, and applications.
Frontend: Built with React.js and Material-UI (MUI). It offers an interface for users to browse job offers, apply for jobs, and manage profiles.
This README will guide you through setting up both the backend and frontend, so you can test and run the full application.
Prerequisites
Ensure you have the following tools installed before starting:
Node.js: Download Node.js
MySQL: Download MySQL
Git: Download Git
Getting Started
Step 1: Clone the Repositories
You need to clone both the frontend and backend repositories.

# Clone the backend
git clone https://github.com/your-repository/jobboard_backend.git
cd jobboard_backend


# Clone the frontend
git clone https://github.com/your-repository/jobboard_frontend.git
cd jobboard_frontend

Step 2: Set Up the Backend
Install Dependencies:

cd jobboard_backend
npm install


Set Up the Database:
Create a MySQL database (refer to the backend README).
Update the .env file with your database credentials.
Run Migrations:

npx sequelize-cli db:migrate


Run Seeders (optional if you have seed files):
The user password for the seed


Each user, recruiter, and admin now has a hashed password (mot_de_passe).
Used bcrypt to hash passwords:
Employees: 'password123'
Recruiters: 'recruiterpassword'
Admins: 'adminpassword'

npx sequelize-cli db:seed:all


Start the Backend:

npm run dev
The backend will be running at http://localhost:5000.
Step 3: Set Up the Frontend
Install Dependencies:

cd jobboard_frontend
npm install


Configure Environment Variables:
Create a .env file in the frontend directory with the following content:

REACT_APP_API_URL=http://localhost:5000/api
Ensure that the backend is running at http://localhost:5000.
Start the Frontend:

npm start
The frontend will be available at http://localhost:3000.
Step 4: Test the Full Application
Now that both the frontend and backend are running, you can test the entire application by visiting http://localhost:3000.
Signup/Login: Create a new user or log in with existing credentials.
Browse Jobs: Search for job offers using the search bar.
Apply for Jobs: View job details and submit applications for job offers.
Conclusion
You now have a fully functional job board running locally on your machine. You can extend or customize the features, deploy the frontend and backend to production, or integrate additional services.


