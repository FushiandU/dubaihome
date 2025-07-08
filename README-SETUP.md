# Dubai Property Pro - Setup Guide

## Features Fixed/Added

✅ **Animation Issue Fixed**: Optimized mouse tracking to prevent elements from vanishing  
✅ **SMTP Integration**: Added email functionality with Hostinger SMTP  
✅ **Contact Updates**: Updated email and phone number throughout the site  
✅ **Admin Dashboard**: Complete CRM system with lead management
✅ **Email Campaigns**: Bulk email functionality with templates
✅ **Settings Management**: SMTP, SEO, and website configuration
✅ **Lead Tracking**: Tags, status updates, and analytics
✅ **Form Integration**: Real-time form submissions with email notifications

## SMTP Configuration

- **Host**: smtp.hostinger.com
- **Port**: 465
- **Encryption**: SSL
- **Username**: noreply@rizarah.com
- **Password**: test@123

## Admin Access

- **URL**: http://localhost:3001/admin
- **Username**: admin
- **Password**: admin123

### Admin Features

1. **Dashboard**: Overview of leads, conversion rates, and campaign performance
2. **Lead Management**: 
   - View, edit, and delete leads
   - Bulk actions (email, tag, export, delete)
   - Status tracking (new, contacted, qualified, converted, lost)
   - Tag system for segmentation
   - Lead value tracking

3. **Email Campaigns**:
   - Create and send bulk email campaigns
   - Template system with personalization
   - Recipient segmentation
   - Campaign analytics (open rates, click rates)

4. **Settings Management**:
   - SMTP configuration with test functionality
   - SEO settings (meta tags, Open Graph, etc.)
   - Website content management
   - Contact information updates

5. **Analytics & Reporting**:
   - Lead conversion tracking
   - Campaign performance metrics
   - Revenue tracking
   - Export functionality

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

4. **CRM Integration**: Lead appears in admin dashboard for follow-up
## Contact Information Updated

- **Phone**: +971 55 799 4258
- **Email**: shibikabeer@gmail.com
- **WhatsApp**: +971 55 799 4258

## File Structure

```
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx    # Main admin interface
│   │   │   └── AdminLogin.tsx        # Admin authentication
│   └── components/
│       └── ModernLandingPage.tsx  # Main landing page (updated)
├── data/                          # Auto-generated data storage
│   ├── leads.json                # Lead database
│   └── settings.json             # System settings
├── server.js                      # Backend server with SMTP
├── package-server.json            # Backend dependencies
└── README-SETUP.md               # This file
```

## Troubleshooting

### Animation Issues
- Mouse tracking is now throttled to 60fps to prevent performance issues
- Elements should no longer vanish when moving the mouse
- Optimized floating animations for better performance

### Email Issues
- Ensure SMTP credentials are correct
- Check firewall settings for port 465
- Verify Hostinger SMTP settings
- Use admin panel to test SMTP connection

### CORS Issues
- Backend includes CORS middleware for local development
- For production, update CORS settings as needed 

### Admin Access Issues
- Ensure you're using the correct credentials (admin/admin123)
- Check that the server is running on the correct port
- Clear browser cache if login issues persist

## Production Deployment Notes

1. **Security**: Change default admin credentials
2. **Database**: Replace JSON file storage with proper database (PostgreSQL, MongoDB)
3. **Authentication**: Implement proper JWT-based authentication
4. **Email**: Configure production SMTP settings
5. **Environment**: Use environment variables for sensitive data
6. **SSL**: Enable HTTPS for production deployment