# DealScout React Frontend

This is the React frontend for the DealScout price comparison platform. It communicates with the Django backend API to display product information, price comparisons, and deals.

## Development Setup

1. First, ensure the Django backend is running:
   ```
   # From the project root
   python manage.py runserver
   ```

2. Install frontend dependencies:
   ```
   cd react-frontend
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Access the frontend at http://localhost:3000

## Building for Production

When you're ready to deploy:

1. Build the React app and integrate it with Django:
   ```
   # From the project root
   ./deal-frontend-build.sh
   ```

2. This will:
   - Build the optimized React code
   - Copy the React index.html to Django templates
   - Copy static assets to Django's static directory

3. Run Django with `DEBUG=False` to serve the production app

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components for each route
- `src/services/` - API service functions
- `src/hooks/` - Custom React hooks
- `src/contexts/` - React context providers (if any)

## Working with the API

The app uses Axios for API calls, with services defined in `src/services/api.js`.

In development, API calls are proxied to http://localhost:8000/api.
In production, API calls are made to the relative /api path on the same server.

## Styling

The app uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js`.