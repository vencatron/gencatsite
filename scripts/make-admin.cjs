require('dotenv').config();
const { Client } = require('pg');

async function makeUserAdmin() {
  // Get email from command line argument
  const email = process.argv[2];

  if (!email) {
    console.log('Usage: node make-admin.cjs <email>');
    console.log('Example: node make-admin.cjs user@example.com');
    process.exit(1);
  }

  console.log(`\nAttempting to make user admin...`);
  console.log(`Email: ${email}`);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Check if user exists
    const checkResult = await client.query(
      'SELECT id, username, email, role FROM users WHERE email = $1',
      [email]
    );

    if (checkResult.rows.length === 0) {
      console.log('❌ No user found with that email');
      await client.end();
      process.exit(1);
    }

    const user = checkResult.rows[0];
    console.log(`\nFound user:`);
    console.log(`  ID: ${user.id}`);
    console.log(`  Username: ${user.username}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Current Role: ${user.role}`);

    if (user.role === 'admin') {
      console.log('\n✅ User is already an admin!');
      await client.end();
      process.exit(0);
    }

    // Update user role to admin
    const updateResult = await client.query(
      'UPDATE users SET role = $1, updated_at = NOW() WHERE email = $2 RETURNING id, username, email, role',
      ['admin', email]
    );

    if (updateResult.rows.length > 0) {
      const updatedUser = updateResult.rows[0];
      console.log(`\n✅ Successfully updated user to admin!`);
      console.log(`  New Role: ${updatedUser.role}`);
      console.log(`\nYou can now access the admin page at:`);
      console.log(`  http://localhost:5001/client-portal/admin`);
    } else {
      console.log('❌ Failed to update user');
    }

    await client.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await client.end();
    process.exit(1);
  }
}

makeUserAdmin();
