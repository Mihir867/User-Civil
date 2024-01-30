# User-civil

User-civil is a web application built with React on the frontend and Node.js on the backend. It connects to a MongoDB database to fetch and display two lists of users. The app provides options to send emails to users using Nodemailer and allows manual user creation.


## Features

1. **User Lists:**
   - Display two lists of users fetched from MongoDB.
   
2. **Send Emails:**
   - Use Nodemailer to send emails to users.
   
3. **Manual User Creation:**
   - Manually create users with specified details.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mihir867/User-civil.git
   cd User-civil
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the backend:
   - Update the MongoDB connection details in `server.js`.
   - Set up Nodemailer with your email service credentials in `server.js`.

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Access the app at [http://localhost:3000](http://localhost:3000).

3. Also make sure the server is running by typing the command node server.js

## Technologies Used

- **Frontend:**
  - React

- **Backend:**
  - Node.js
  - Express
  - MongoDB

- **Additional Libraries:**
  - Nodemailer

## Contributing

If you'd like to contribute to User-civil, please follow these guidelines:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
