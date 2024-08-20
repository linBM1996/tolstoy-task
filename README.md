# Overview
This is a full-stack application that allows users to input a list of URLs, fetch metadata (title, description, and an image) for each URL, and display the results.

# Prerequisites
🌐 Node.js
📦 npm

# Setup Instructions
To run the server and the client, use two separate terminals.

## Back-End (Node.js)
Navigate to the server directory:
cd server

Install the dependencies:
npm install

Start the server:
node index.js

## Front-End (React)
Install the dependencies:
npm install

Start the React application:
npm start

## Running Tests
Run the following command in the root directory:
npm test

# Additional Features
🚦 Rate Limiting: Rate limiting on the server to handle a maximum of 5 requests per second.
🔒 Security: The application is secure against:
🛡️ XSS (using Helmet)
🛡️ CSRF (using Csurf)
🧪 Test Files: Test files for both server and client sides using Vitest and Vite.
