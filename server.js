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
const sendConfirmationEmail = (email, username, ) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Confirmation at Forrest Hills`,
      text: `Hello ${username},\n\nThank you for booking with Forrest Hills! Your reservation has been confirmed.\n\nDetails of your booking:\nHotel: Forrest Hills\n\nWe look forward to welcoming you. If you have any questions or need assistance, feel free to contact us.\n\nBest regards,\nForrest Hills Team`
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
