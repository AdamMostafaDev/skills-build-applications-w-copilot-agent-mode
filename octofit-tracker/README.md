# OctoFit Tracker

A modern multi-tier application for fitness tracking and monitoring.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite frontend (port 5173)
├── backend/           # Node.js + Express + TypeScript backend (port 8000)
└── docs/              # Documentation
```

## Requirements

- **Frontend**: React 19, Vite, Node.js 18+, npm 9+
- **Backend**: Node.js 18+, Express, TypeScript, Mongoose
- **Database**: MongoDB (port 27017)

## Getting Started

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend API will be available at: `http://localhost:8000`

Health check endpoint: `http://localhost:8000/api/health`

### Database

Ensure MongoDB is running on port 27017.

Environment variable: `MONGODB_URI=mongodb://localhost:27017/octofit-tracker`

## Development Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start compiled server
