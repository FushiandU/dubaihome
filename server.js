const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Database simulation (in production, use a real database)
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Helper functions for data persistence
const readLeads = () => {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error reading leads:', error);
  }
  return [];
};

const writeLeads = (leads) => {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error('Error writing leads:', error);
  }
};

const readSettings = () => {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error reading settings:', error);
  }
  return {
    smtp: {
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      username: 'noreply@rizarah.com',
      password: 'test@123',
      fromName: 'Dubai Property Pro',
      fromEmail: 'noreply@rizarah.com'
    },
    website: {
      companyName: 'Dubai Property Pro',
      phone: '+971 55 799 4258',
      email: 'shibikabeer@gmail.com',
      whatsapp: '+971 55 799 4258'
    }
  };
};

const writeSettings = (settings) => {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Error writing settings:', error);
  }
};
// SMTP Configuration
const getSmtpConfig = () => {
  const settings = readSettings();
  return {
    host: settings.smtp.host,
    port: settings.smtp.port,
    secure: settings.smtp.secure,
    auth: {
      user: settings.smtp.username,
      pass: settings.smtp.password
    }
  };
};

// Create transporter function
const createTransporter = () => {
  return nodemailer.createTransporter(getSmtpConfig());
};

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

    // Save lead to database
    const leads = readLeads();
    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      status: 'new',
      tags: [],
      source: 'Landing Page',
      createdAt: new Date().toISOString(),
      value: null
    };
    leads.push(newLead);
    writeLeads(leads);

    const settings = readSettings();
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: `${settings.smtp.fromName} <${settings.smtp.fromEmail}>`,
      to: settings.website.email,
      subject: 'New Dubai Property Guide Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Guide Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Lead ID:</strong> ${newLead.id}</p>
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
      from: `${settings.smtp.fromName} <${settings.smtp.fromEmail}>`,
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
          <p>📞 ${settings.website.phone}</p>
          <p>📧 ${settings.website.email}</p>
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

// Admin API endpoints
app.get('/api/admin/leads', (req, res) => {
  try {
    const leads = readLeads();
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
});

app.put('/api/admin/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const leads = readLeads();
    const leadIndex = leads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    
    leads[leadIndex] = { ...leads[leadIndex], ...updates };
    writeLeads(leads);
    
    res.json({ success: true, lead: leads[leadIndex] });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
});

app.delete('/api/admin/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const leads = readLeads();
    const filteredLeads = leads.filter(lead => lead.id !== id);
    
    if (leads.length === filteredLeads.length) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    
    writeLeads(filteredLeads);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lead' });
  }
});

app.get('/api/admin/settings', (req, res) => {
  try {
    const settings = readSettings();
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
});

app.put('/api/admin/settings', (req, res) => {
  try {
    const newSettings = req.body;
    writeSettings(newSettings);
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

app.post('/api/admin/test-smtp', async (req, res) => {
  try {
    const transporter = createTransporter();
    const settings = readSettings();
    
    await transporter.sendMail({
      from: `${settings.smtp.fromName} <${settings.smtp.fromEmail}>`,
      to: settings.website.email,
      subject: 'SMTP Test Email',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>SMTP Configuration Test</h2>
          <p>This is a test email to verify your SMTP configuration is working correctly.</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        </div>
      `
    });
    
    res.json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('SMTP test error:', error);
    res.status(500).json({ success: false, message: 'SMTP test failed: ' + error.message });
  }
});

app.post('/api/admin/send-campaign', async (req, res) => {
  try {
    const { subject, content, recipients } = req.body;
    const leads = readLeads();
    const settings = readSettings();
    const transporter = createTransporter();
    
    // Filter leads based on recipients criteria
    const targetLeads = leads.filter(lead => {
      if (recipients === 'all') return true;
      if (recipients === 'new') return lead.status === 'new';
      if (recipients === 'qualified') return lead.status === 'qualified';
      if (recipients === 'high-value') return lead.tags.includes('high-value');
      return false;
    });
    
    // Send emails to all target leads
    const emailPromises = targetLeads.map(lead => {
      return transporter.sendMail({
        from: `${settings.smtp.fromName} <${settings.smtp.fromEmail}>`,
        to: lead.email,
        subject: subject,
        html: content.replace(/\{name\}/g, lead.name)
      });
    });
    
    await Promise.all(emailPromises);
    
    res.json({ 
      success: true, 
      message: `Campaign sent to ${targetLeads.length} recipients` 
    });
  } catch (error) {
    console.error('Campaign send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send campaign: ' + error.message });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin panel available at: http://localhost:${PORT}/admin`);
  const smtpConfig = getSmtpConfig();
  console.log(`SMTP configured for: ${smtpConfig.host}:${smtpConfig.port}`);
}); 