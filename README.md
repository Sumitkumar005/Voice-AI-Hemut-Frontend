# Hemut Voice AI - Frontend

Modern React dashboard for managing drivers and AI voice calls.

## Features

- 📊 Real-time driver dashboard
- 📞 One-click AI calling
- 📈 Call logs and analytics
- 🔄 Auto-refreshing data
- 📱 Responsive design
- 🎨 Modern UI with smooth animations

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS-in-JS
- **State Management**: React Hooks
- **Deployment**: Ready for Vercel/Netlify

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Update API URL** in `src/App.jsx`:
   ```javascript
   const API_URL = 'http://localhost:8000'; // Change for production
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Components

- **Dashboard**: Overview of system metrics
- **DriverList**: Driver management with call buttons
- **CallLogs**: Call history and analytics

## Deployment

Ready for deployment on:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting platform