const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

// Set up Nodemailer transport using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
},
tls: {
  rejectUnauthorized: false // Disable certificate validation (use with caution)
}
});

// Function to send confirmation email
const sendConfirmationEmail = (email, username) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirm Your Email Address',
    text: `Hello ${username},\n\nThank you for signing up! Please confirm your email address to complete the registration process.\n\nBest regards,\nYour App Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Route to handle user registration and send confirmation email
app.post('/register', (req, res) => {
  const { email, username } = req.body;

  // Send confirmation email
  sendConfirmationEmail(email, username);

  res.status(200).send('Registration successful! Please check your email for confirmation.');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`);
});
