import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Debug endpoint to test login flow without actually logging in
 * Shows what would happen during authentication
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Load dependencies
    const [storageModule, jwtModule] = await Promise.all([
      import('../storage.js'),
      import('../jwt.js'),
    ]);

    const { storage } = storageModule;
    const { generateAccessToken, generateRefreshToken } = jwtModule;

    // Test database connection
    let dbConnectionWorks = false;
    let userCount = 0;
    try {
      // Try to query users table
      const users = await storage.listUsers();
      dbConnectionWorks = true;
      userCount = users.length;
    } catch (error) {
      console.error('Database connection error:', error);
    }

    // Test JWT token generation (with dummy user)
    let jwtWorks = false;
    try {
      const dummyUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'client' as const,
      };
      const accessToken = generateAccessToken(dummyUser);
      const refreshToken = generateRefreshToken(dummyUser);
      jwtWorks = !!(accessToken && refreshToken);
    } catch (error) {
      console.error('JWT generation error:', error);
    }

    // Check environment
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_URL_starts_with_postgresql: process.env.DATABASE_URL?.startsWith('postgresql://') || false,
      JWT_ACCESS_SECRET: !!process.env.JWT_ACCESS_SECRET,
      JWT_ACCESS_SECRET_length: process.env.JWT_ACCESS_SECRET?.length || 0,
      JWT_REFRESH_SECRET: !!process.env.JWT_REFRESH_SECRET,
      JWT_REFRESH_SECRET_length: process.env.JWT_REFRESH_SECRET?.length || 0,
      NODE_ENV: process.env.NODE_ENV || 'not-set',
      VERCEL_ENV: process.env.VERCEL_ENV || 'not-set',
    };

    return res.status(200).json({
      status: 'ok',
      message: 'Debug test completed',
      tests: {
        databaseConnection: {
          works: dbConnectionWorks,
          userCount: userCount,
        },
        jwtGeneration: {
          works: jwtWorks,
        },
        environment: envCheck,
      },
      recommendations: [
        !envCheck.DATABASE_URL && 'Add DATABASE_URL environment variable',
        !envCheck.JWT_ACCESS_SECRET && 'Add JWT_ACCESS_SECRET environment variable',
        !envCheck.JWT_REFRESH_SECRET && 'Add JWT_REFRESH_SECRET environment variable',
        envCheck.NODE_ENV !== 'production' && 'Set NODE_ENV=production for Vercel deployment',
        !dbConnectionWorks && 'Database connection failed - check DATABASE_URL is correct',
        !jwtWorks && 'JWT token generation failed - check JWT secrets are set',
      ].filter(Boolean),
    });
  } catch (error) {
    console.error('Test login error:', error);
    return res.status(500).json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
