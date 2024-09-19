# OBS Frontend Assignment - User Management Application

## Description

This application is a user management system built with Next.js, React, and Material-UI. It allows users to view, add, edit, and delete user information. The application demonstrates proficiency in modern frontend development practices, including state management, API integration, and responsive design.

## Features

- View a list of users
- Add new users
- Edit existing user information
- Delete users
- Responsive design for both desktop and mobile devices

## Technologies Used

- Next.js
- React
- TypeScript
- Material-UI
- Zustand (for state management)
- Jest and React Testing Library (for testing)

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:mrezzaaa/frontend-challenge.git
   ```

2. Navigate to the project directory:
   ```
   cd frontend-challenge
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application in development mode:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

Open [Live Demo](https://obs-frontend-challenge.vercel.app)

## Building for Production

To create a production build:

```
npm run build
```

To run the production build:

```
npm start
```

## Running Tests

To run the test suite:

```
npm test
```

## Project Structure

- `src/components/`: React components
- `src/pages/`: Next.js pages
- `src/store/`: Zustand store for state management
- `src/props/`: TypeScript interfaces and types
- `__test__/`: Test files

## Additional Information

- This project uses a mock API for demonstration purposes. In a real-world scenario, you would integrate with a backend API.
- The application is fully responsive and works on both desktop and mobile devices.
- State management is handled using Zustand, providing a simple and efficient solution for managing application state.
- The project includes a comprehensive test suite to ensure reliability and maintainability.

## Future Improvements

- Implement user authentication and authorization
- Add pagination for the user list
- Implement more advanced filtering and sorting options
- Enhance error handling and user feedback



## License

This project is licensed under the MIT License based on React and Next.JS.