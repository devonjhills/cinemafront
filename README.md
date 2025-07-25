# CinemaFront

A single-page movie discovery web app built with React, TypeScript, and the TMDB API.

<img width="1122" height="823" alt="Screenshot 2025-07-23 at 5 08 38 AM" src="https://github.com/user-attachments/assets/34a5cb4d-bb97-465b-b648-eb4966a620d9" />

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/devonjhills/cinemafront.git
   cd cinemafront
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Then add the TMDB API key (provided in email) to the `.env` file.

4. **Run the application**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## Additional Commands

- `npm run test` - Run all tests
- `npm run build` - Build for production
- `npm run lint` - Run linting

## Tech Stack

### Core Technologies

- **React 19** - View layer as required, using the latest version for modern React features
- **TypeScript** - Required for type safety and better development experience
- **Vite** - Fast modern build tool and development server

### API & Data Management

- **TMDB API** - Chosen for its comprehensive database with rich metadata, images, and search capabilities
- **TanStack Query** - Robust data fetching, caching, and synchronization for API calls
- **Axios** - HTTP client for reliable API requests with better error handling than fetch

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework for maintainable styling without relying on pre-built UI kits
- **Headless UI** - Unstyled, accessible UI components that complement Tailwind

### Routing & State

- **React Router** - Client-side routing for the single-page application
- **URL State Management** - Custom hook for synchronizing UI state with URL parameters

### Testing

- **Vitest** - Fast, modern jest-like test runner with TypeScript support
- **React Testing Library** - Testing focused on user behavior rather than implementation details
- **MSW (Mock Service Worker)** - API mocking for reliable, realistic integration testing
