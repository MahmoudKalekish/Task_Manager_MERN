# Task Management Application (MERN Stack)

## Overview

The application allows users to manage tasks by providing features for adding, editing, and deleting tasks. Each task has a title, description, and due date. Users can also mark tasks as completed.

## Features

### Frontend (Next.js - app directory)

- User-friendly interface for managing tasks.
- Create, edit, and delete tasks.
- Tasks have a title, description, and due date.
- Ability to mark tasks as completed.
- Form input validation using Yup and Formik.
- State management using Redux Toolkit and RTK Query.

### Backend (Node.js + Express)

- RESTful API endpoints for CRUD operations on tasks.
- MongoDB database for storing tasks.
- Secure backend implementation with proper error handling and data validation.

## Usage

### Backend

1. Clone the repository:
   ```Terminal
   git clone https://github.com/MahmoudKalekish/Task_Manager_MERN.git

2. Navigate to the backend directory:
   ```Terminal
   cd task-management-app/backend

3. Install dependencies:
   ```Terminal
   npm install

4. Run the backend server:
   ```Terminal
   npm run start

 ### But no need to run the backend because it is deployed, so you can directly run the frontend.
   ```Terminal
https://tasks-1njw.onrender.com



### Frontend

1. Open a new terminal.

2. Navigate to the app directory:
   ```Terminal
   cd task-management-app/app

3. Install dependencies:
   ```Terminal
   npm install


4. Run the frontend application:
   ```Terminal
   npm run dev

