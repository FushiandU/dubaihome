const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// SMTP Configuration
const smtpConfig = {
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'noreply@rizarah.com',
    pass: 'test@123'
  }
};

// Create transporter
const transporter = nodemailer.createTransporter(smtpConfig);

// API endpoint for form submission
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email content
    const mailOptions = {
      from: 'noreply@rizarah.com',
      to: 'shibikabeer@gmail.com', // Admin email
      subject: 'New Dubai Property Guide Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Guide Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <hr>
          <p style="color: #6b7280; font-size: 14px;">
            This request was submitted from the Dubai Property Pro landing page.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const userMailOptions = {
      from: 'noreply@rizarah.com',
      to: email,
      subject: 'Your Dubai Property Investment Guide',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for your interest!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for requesting our comprehensive Dubai Property Investment Guide.</p>
          <p>Our expert team will contact you within 24 hours to provide:</p>
          <ul>
            <li>📊 Personalized investment analysis</li>
            <li>🏠 Property recommendations</li>
            <li>💰 Financing options</li>
            <li>⚖️ Legal guidance</li>
          </ul>
          <p><strong>Contact us:</strong></p>
          <p>📞 +971 55 799 4258</p>
          <p>📧 shibikabeer@gmail.com</p>
          <hr>
          <p style="color: #6b7280; font-size: 14px;">
            Dubai Property Pro - Your trusted partner for Dubai real estate investment
          </p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);

    res.json({ 
      success: true, 
      message: 'Form submitted successfully. Check your email for the guide.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again.' 
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`SMTP configured for: ${smtpConfig.host}:${smtpConfig.port}`);
}); 