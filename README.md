# StockWave Server

Backend for StockWave, built with Node.js, Express, TypeScript, MongoDB, JWT authentication, and Socket.IO.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control for admin and trader users
- Admin profile listing
- Asset creation and asset listing APIs
- Real-time asset price updates over Socket.IO
- Automatic admin seeding on server startup

## Tech Stack

- Node.js
- Express 5
- TypeScript
- MongoDB with Mongoose
- JSON Web Token
- Socket.IO
- bcryptjs

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the `server` folder:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the development server:

```bash
npm run dev
```

The API runs on `http://localhost:8080`.

## Available Scripts

- `npm run dev` - start the server with `tsx watch`
- `npm run build` - compile TypeScript into `dist`
- `npm run start` - run the compiled server from `dist/server.js`

## API Routes

### Auth

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - log in a user
- `GET /api/auth/profile` - get all user profiles, admin only

### Assets

- `POST /api/asset` - create an asset, admin only
- `GET /api/asset` - list all assets, authenticated users

## Real-Time Events

Socket.IO is attached to the HTTP server and accepts connections from:

- `http://localhost:5173`

The server emits live asset updates while the price updater is running.

## Default Admin Account

On startup, the server seeds a default admin user if it does not already exist:

- Email: `admin@mail.com`
- Password: `admin123`

## Notes

- The server starts a live asset price updater with a 3-second interval.
- If `JWT_SECRET` is not provided, the code falls back to `JWT_SECRET`, which is fine for local development but should not be used in production.
