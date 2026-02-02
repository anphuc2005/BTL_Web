# Phone Repair Frontend

React application for the Phone Repair Management System.

## Technologies

- React 18.2
- React Router v6
- TailwindCSS 3.3
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8080/api
```

## Available Scripts

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Header, Footer, etc.)
│   ├── customer/        # Customer-specific components
│   └── admin/           # Admin-specific components
├── pages/               # Page components
│   ├── Home.jsx
│   ├── BookingForm.jsx
│   ├── ServiceTracking.jsx
│   └── AdminDashboard.jsx
├── services/            # API service calls
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── styles/              # CSS files
├── App.jsx              # Main App component
└── index.js             # Entry point
```

## Features

### Customer Features
- View services and parts
- Book repair appointments
- Track repair status
- Submit feedback
- Select device type and service type
- View price ranges

### Admin Features
- Manage bookings (view, update, cancel)
- Manage parts inventory
- View reports and revenue
- Search functionality
- Real-time status updates

## API Integration

The frontend communicates with the Spring Boot backend via REST API.
API client configuration is in `src/services/api.js`.

## Styling

Using TailwindCSS with custom configuration in `tailwind.config.js`.
Custom utility classes are defined in `src/styles/App.css`.

## Responsive Design

The application is fully responsive and works on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## Development

1. Make sure the backend server is running
2. Start the development server: `npm start`
3. Access the application at http://localhost:3000

## Build for Production

```bash
npm run build
```

The production build will be in the `build/` directory.

## Deployment

The built application can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

## Support

For issues and questions, please contact the development team.
