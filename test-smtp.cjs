require('dotenv').config();

console.log('Testing SMTP Configuration...');
console.log('Host:', process.env.SMTP_HOST);
console.log('Port:', process.env.SMTP_PORT);
console.log('User:', process.env.SMTP_USER);
console.log('Has Password:', !!process.env.SMTP_PASS);
console.log('Password Length:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0);

// Simple connection test
const nodemailer = require('nodemailer');

async function testConnection() {
  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    console.log('\nTesting connection...');
    await transporter.verify();
    console.log('✅ Connection successful!');
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    if (error.message.includes('Username and Password not accepted')) {
      console.log('\nPossible issues:');
      console.log('1. App password may be incorrect or revoked');
      console.log('2. 2-Factor Authentication might not be enabled');
      console.log('3. Account might be blocking "less secure apps"');
      console.log('4. Too many failed attempts (wait 15-30 minutes)');
    }
  }
}

testConnection();