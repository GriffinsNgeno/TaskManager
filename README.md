# Task Manager
The Task Manager is a web application that allows users to manage their tasks, featuring user authentication, task management, and a responsive UI.

##  Links
- [Live link](https://task-manager-rho-six.vercel.app/)


## Frontend
The frontend is a responsive web application optimized for both desktop and mobile devices. It uses React, React Router, Axios, Tailwindcss, and Font Awesome to provide the following functionalities to the users:

## Features

- User registration and login
- Task listing
- Add, edit, and delete tasks
- Mark tasks as complete or incomplete


## Backend
The backend is built with Python and uses SQLite as the database. It provides several API endpoints that the frontend uses to retrieve and manipulate data. The models used in the backend are:

- GET /tasks/ - Retrieve all tasks.
- POST /tasks/ - Create a new task.
- GET /tasks/<id>/ - Retrieve a specific task.
- PATCH /tasks/<id>/ - Update a task.
- DELETE /tasks/<id>/ - Delete a task.

### Setup
To set up the backend, follow these steps:

Clone the repository:
       
    git clone https://github.com/GriffinsNgeno/TaskManager.git
                
### Install dependencies:

    cd ../backend
    pip install -r requirements.txt

### Create and migrate the database:

   python manage.py migrate

### Create Superuser

    python manage.py createsuperuser

### Start the server:

   python manage.py runserver

## To set up the frontend, follow these steps:
#### Clone the repository:

    https://github.com/GriffinsNgeno/TaskManager.git

#### Install dependencies:

    cd ../frontend
    npm install

#### Start the development server:

    npm start

#### Build the production version:

    npm run build

## Authors
- Griffins Ngeno (`https://github.com/GriffinsNgeno`)

## Conclusion
The Task Manager program is a powerful tool that allows users to easily manage their chores and increase productivity. By combining a user-friendly UI with a robust backend, the application provides a full task management solution. Users may simply add, view, amend, and delete tasks while navigating a smooth and responsive interface.