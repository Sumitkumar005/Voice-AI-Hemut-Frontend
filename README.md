# Hemut Voice AI Frontend

Modern React dashboard for managing AI-powered driver calls and load assignments.

## 🚀 Live Demo

**Production App:** https://voice-ai-hemut-frontend.vercel.app/

## 🏗️ Architecture

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Vanilla CSS** - Custom styling with modern CSS features
- **Vercel** - Serverless deployment platform

## 📋 Features

- ✅ Real-time driver dashboard
- ✅ One-click AI calling system
- ✅ Driver status management
- ✅ Call history and logs
- ✅ Load assignment tracking
- ✅ Responsive design
- ✅ Auto-refresh functionality
- ✅ Modern UI/UX

## 🛠️ Tech Stack

- React 18.2.0
- Vite 5.0.8
- Modern JavaScript (ES6+)
- CSS3 with Flexbox/Grid
- Fetch API for HTTP requests

## 📦 Installation

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/your-username/hemut-frontend.git
cd hemut-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your backend URL
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Docker Development

1. **Build the image**
```bash
docker build -t hemut-frontend .
```

2. **Run the container**
```bash
docker run -p 3000:3000 --env-file .env hemut-frontend
```

## 🌍 Environment Variables

Create a `.env.local` file with:

```env
# Backend API URL
VITE_API_URL=https://voice-ai-hemut-backend-production.up.railway.app
```

### Environment Files Priority

1. `.env.local` - Local development (ignored by git)
2. `.env` - Default values (committed to git)
3. Vercel environment variables (production)

## 🎨 Features Overview

### Dashboard Tab
- Driver statistics overview
- Load availability summary
- Recent call activity
- System health indicators

### Drivers Tab
- Complete driver list with status
- Current location tracking
- Load status (Available/Loaded)
- One-click call initiation
- Real-time status updates

### Call Logs Tab
- Historical call records
- Call outcomes and reasons
- Driver response tracking
- Timestamp information

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect GitHub repository to Vercel**
2. **Configure build settings:**
   - Framework Preset: `Vite`
   - Root Directory: `frontend` (if in monorepo)
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set environment variables in Vercel:**
   - `VITE_API_URL`: Your backend URL

4. **Deploy automatically on push to main**

### Manual Deployment

1. **Build the application**
```bash
npm run build
```

2. **Serve the dist folder**
```bash
npm run preview
# Or use any static file server
```

## 🔧 Configuration

### API Integration

The app automatically connects to your backend API using the `VITE_API_URL` environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

### Auto-refresh

The dashboard automatically refreshes data every 30 seconds:
```javascript
useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 30000);
  return () => clearInterval(interval);
}, []);
```

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎯 Component Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Main dashboard overview
│   ├── DriverList.jsx     # Driver management interface
│   └── CallLogs.jsx       # Call history display
├── App.jsx                # Main application component
└── main.jsx              # Application entry point
```

## 🔄 State Management

The app uses React's built-in state management:
- `useState` for component state
- `useEffect` for side effects
- Props for component communication
- Context API (if needed for global state)

## 🎨 Styling

### CSS Architecture
- Component-scoped styles
- CSS custom properties (variables)
- Flexbox and Grid layouts
- Mobile-first responsive design

### Color Scheme
- Primary: `#2563eb` (Blue)
- Secondary: `#667eea` (Light Blue)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Orange)
- Error: `#ef4444` (Red)

## 📊 Performance

### Optimization Features
- Vite's fast HMR (Hot Module Replacement)
- Tree shaking for smaller bundles
- Code splitting (if implemented)
- Optimized images and assets
- Minimal dependencies

### Bundle Size
- React + ReactDOM: ~42KB gzipped
- Application code: ~15KB gzipped
- Total bundle: ~60KB gzipped

## 🧪 Testing

### Manual Testing Checklist
- [ ] Dashboard loads with correct data
- [ ] Driver list displays all drivers
- [ ] Call button initiates calls successfully
- [ ] Call logs show historical data
- [ ] Auto-refresh works correctly
- [ ] Responsive design on all devices
- [ ] Error handling for API failures

### Automated Testing (Future)
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

## 🐛 Troubleshooting

### Common Issues

1. **API connection failed**
   - Check `VITE_API_URL` environment variable
   - Verify backend is running and accessible
   - Check CORS configuration in backend

2. **Build fails**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version (16+ recommended)
   - Verify all dependencies are installed

3. **Environment variables not working**
   - Ensure variables start with `VITE_`
   - Restart dev server after changing .env files
   - Check Vercel environment variables in production

### Debug Mode

Enable debug logging:
```javascript
// Add to App.jsx
console.log('API_URL:', import.meta.env.VITE_API_URL);
console.log('Environment:', import.meta.env.MODE);
```

## 🔒 Security

### Best Practices Implemented
- Environment variables for sensitive data
- HTTPS in production
- Input validation on forms
- XSS protection through React
- CORS properly configured

## 🚀 Performance Monitoring

### Metrics to Track
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Bundle size
- API response times

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards:
   - Use functional components with hooks
   - Follow React best practices
   - Add comments for complex logic
   - Ensure responsive design
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email sumit@hemut.com or create an issue on GitHub.

## 🔗 Related Links

- [Backend Repository](https://github.com/Sumitkumar005/Voice-AI-Hemut-Backend)
- [Live Backend API](https://voice-ai-hemut-backend-production.up.railway.app/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)