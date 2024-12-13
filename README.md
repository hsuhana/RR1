# A Reservation System Project
A web application for managing restaurant reservations.

# Prerequisites
Before setting up the project, make sure you have the following software installed:

## Node.js (>=14.0): The JavaScript runtime required to run both the backend and frontend. You can download it from nodejs.org.
## npm (>=6.0) or yarn: These come with Node.js by default and will be used to install the dependencies for both the backend and frontend.

# Backend Dependencies:
The backend is built with Express and requires the following dependencies:

## Express: Web framework for building the API and handling HTTP requests.
## Passport and passport-local-mongoose: Authentication middleware for managing user login with MongoDB.
## cookie-parser: Middleware to parse cookies.
## express-session: Session management for maintaining user sessions.
## morgan: HTTP request logger.
## moment: Date manipulation library.
## http-errors: Utility for creating HTTP errors.
## jade: Templating engine for rendering HTML views.
## cors: Middleware to handle Cross-Origin Resource Sharing (CORS).
## For setting up the backend, you’ll also need to have MongoDB (either  locally or using a service like MongoDB Atlas) if using passport-local-mongoose for authentication.

# Frontend Dependencies:
The frontend is built using React and has the following dependencies:

## React and React DOM: Libraries for building the user interface.
## react-router-dom: For handling navigation between pages in the app.
## axios: For making HTTP requests from the frontend to the backend.
## @testing-library/react: For testing React components.
## react-scripts: A set of scripts used to build, test, and start the React app.
## web-vitals: For measuring performance of the React app.

# Proxy Setup:
The frontend is set up to proxy API requests to the backend running on http://localhost:5001, as defined by the proxy field in the frontend/package.json. Make sure the backend is running on the specified port.

# Usage / Features

## User Registration, Login, and Logout

### Register a new user
To register a new user, send a POST request to /register with the following fields in the request body:

firstName
lastName
username
email
phoneNumber
birthday
password

Example request:
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "phoneNumber": "123456789",
  "birthday": "1990-01-01",
  "password": "securepassword"
}

### Log in an existing user
To log in, send a POST request to /login with username and password in the request body.

Example request:
{
  "username": "johndoe",
  "password": "securepassword"
}

### Log out
To log out, send a POST request to /logout.

## Authentication Check
To check if the user is authenticated, send a GET request to /check. The server will respond with the authentication status.

Example request:
GET /check

Response:
{
  "isAuthenticated": true,
  "user": {
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe"
  }
}

## Reservation System

### Step 1: Pick a Date
To view available dates for the next 14 days, send a GET request to /available-dates. This will return a list of dates when reservations are available.

Example request:
GET /available-dates

Response:
[
  "2024-12-01",
  "2024-12-02",
  "2024-12-03",
  ...
]

### Step 2: Select a Time Slot
Once a date is selected, send a GET request to /available-time-slots with the selected date as a query parameter to get available time slots for that day.

Example request:
GET /available-time-slots?date=2024-12-01

Response:
[
  { "time": "12:00 PM", "isAvailable": true },
  { "time": "03:00 PM", "isAvailable": true },
  { "time": "06:00 PM", "isAvailable": true }
]

### Step 3: Select a Table
After selecting a time slot, send a GET request to /available-tables with the selected date, time slot, and number of guests to retrieve available tables.

Example request:
GET /available-tables?date=2024-12-01&timeSlot=12:00 PM&guests=4

Response:
[
  { "tableId": "123", "seats": 4, "isActive": true },
  { "tableId": "124", "seats": 4, "isActive": true }
]

### Step 4: Special Requests (Optional)
Once the table is selected, users can submit any special requests in the specialRequests field when making a reservation.

### Step 5: Make a Reservation
To make a reservation, send a POST request to /reserve with the following fields:

date
timeSlot
tableId
guests
specialRequests (optional)

Example request:
{
  "date": "2024-12-01",
  "timeSlot": "12:00 PM",
  "tableId": "123",
  "guests": 4,
  "specialRequests": "Vegetarian menu"
}

## Member Profile

### View Profile
To view a member's profile, send a GET request to /profile. This will return the user's information and their reservations.

Example request:
GET /profile

Response:
{
  "success": true,
  "member": {
    "_id": "12345",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "phoneNumber": "123456789"
  },
  "reservations": [
    {
      "_id": "67890",
      "date": "2024-12-01",
      "timeSlot": "12:00 PM",
      "tableId": "123",
      "guests": 4,
      "specialRequests": "Vegetarian menu"
    }
  ]
}

### Edit Profile
To edit a member's profile, send a PATCH request to /profile with the fields you wish to update.

Example request:
{
  "phoneNumber": "987654321"
}

### Cancel a Reservation
To cancel a reservation, send a DELETE request to /reservations/:id where :id is the reservation's ID.

Example request:
DELETE /reservations/12345# RR1
