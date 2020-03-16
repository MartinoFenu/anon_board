# Anonymous Message Board

## Description

This is a **MERN stack** project.

This anonymous message board is based on the freecodecamp challenge [build an Anonymous Message Board](https://www.freecodecamp.org/learn/information-security-and-quality-assurance/information-security-and-quality-assurance-projects/anonymous-message-board).

Node and Express are used to build the backend and the REST API.
Mongoose is used to connect the app to a MongoDB Atlas database.
To create a new reply or thread you need to insert a password, every password is hashed using bcrypt and saved in the database.
A custom validation schema for inputs is in place for the frontend and for the backend (based on express-validator).

The Frontend is bootstrapped by Create React App and the connections to the API endpoints are made using axios.

Every Board is created by an admin user, the admin can delete every thread and reply after login.
There are several custom hooks to provide custom functionalities (like form validation, data fetch etc.).

## Running the app

### Development mode

You can run the app in development mode using nodemon for the backend and the live reload of creat react api

### `npm run dev`
