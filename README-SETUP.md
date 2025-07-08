# Dubai Property Pro - Setup Guide

## Features Fixed/Added

✅ **Animation Issue Fixed**: Optimized mouse tracking to prevent elements from vanishing  
✅ **SMTP Integration**: Added email functionality with Hostinger SMTP  
✅ **Contact Updates**: Updated email and phone number throughout the site  

## SMTP Configuration

- **Host**: smtp.hostinger.com
- **Port**: 465
- **Encryption**: SSL
- **Username**: noreply@rizarah.com
- **Password**: test@123

## Setup Instructions

### 1. Frontend Setup

```bash
# Install frontend dependencies
pnpm install

# Build the frontend
pnpm run build

# Start development server (optional)
pnpm run dev
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Start the backend server
npm start

# Or for development with auto-restart
npm run dev
```

### 3. Running the Application

1. **Start the backend server first** (runs on port 3001)
2. **Build and serve the frontend** (served by backend on port 3001)

The backend will serve the built React app and handle form submissions with email functionality.

## Email Flow

When a user submits the form:

1. **Admin Notification**: Email sent to `shibikabeer@gmail.com` with form details
2. **User Confirmation**: Email sent to the user with guide information and contact details

## Contact Information Updated

- **Phone**: +971 55 799 4258
- **Email**: shibikabeer@gmail.com
- **WhatsApp**: +971 55 799 4258

## File Structure

```
├── src/
│   └── components/
│       └── ModernLandingPage.tsx  # Main landing page (updated)
├── server.js                      # Backend server with SMTP
├── package-server.json            # Backend dependencies
└── README-SETUP.md               # This file
```

## Troubleshooting

### Animation Issues
- Mouse tracking is now throttled to 60fps to prevent performance issues
- Elements should no longer vanish when moving the mouse

### Email Issues
- Ensure SMTP credentials are correct
- Check firewall settings for port 465
- Verify Hostinger SMTP settings

### CORS Issues
- Backend includes CORS middleware for local development
- For production, update CORS settings as needed 