const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP Port:', process.env.SMTP_PORT);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('From Email:', process.env.EMAIL_FROM);
  console.log('Password configured:', process.env.SMTP_PASS ? 'Yes' : 'No');

  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify connection
    console.log('\nVerifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    console.log('\nSending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@iamatrust.com',
      to: process.env.SMTP_USER, // Send to yourself
      subject: 'Test Email - Generation Catalyst',
      text: 'This is a test email from your Generation Catalyst application.',
      html: '<p>This is a <b>test email</b> from your Generation Catalyst application.</p>',
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Email test failed:', error.message);

    if (error.responseCode === 535) {
      console.error('\n📝 Authentication failed. You need to:');
      console.error('1. Generate an App Password from Google Account Settings');
      console.error('2. Go to: https://myaccount.google.com/apppasswords');
      console.error('3. Update SMTP_PASS in your .env file with the 16-character app password');
    }
  }
}

testEmail();