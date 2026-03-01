import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createMcpHandler } from '@vercel/mcp-adapter';

// SECURITY NOTE: This endpoint exposes deployment diagnostics.
// It only reveals environment variable *presence* (not values) and
// is intended for development/debugging via MCP-compatible clients.
// In a high-security environment, consider restricting access.

// Create the MCP handler with tools for debugging the deployment
const handler = createMcpHandler({
  tools: [
    {
      name: 'check-deployment-status',
      description: 'Check the current deployment status and environment configuration',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      handler: async () => {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                timestamp: new Date().toISOString(),
                environment: {
                  NODE_ENV: process.env.NODE_ENV,
                  VERCEL: process.env.VERCEL,
                  VERCEL_ENV: process.env.VERCEL_ENV,
                  VERCEL_REGION: process.env.VERCEL_REGION,
                  DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
                  JWT_ACCESS_SECRET_EXISTS: !!process.env.JWT_ACCESS_SECRET,
                  JWT_REFRESH_SECRET_EXISTS: !!process.env.JWT_REFRESH_SECRET,
                },
                message: 'MCP endpoint is working! API functions are deploying correctly.',
              }, null, 2),
            },
          ],
        };
      },
    },
    {
      name: 'test-database-connection',
      description: 'Test the database connection from the MCP endpoint',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      handler: async () => {
        try {
          const { neon } = await import('@neondatabase/serverless');
          const databaseUrl = process.env.DATABASE_URL;

          if (!databaseUrl) {
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    success: false,
                    error: 'DATABASE_URL environment variable not set',
                  }, null, 2),
                },
              ],
            };
          }

          const sql = neon(databaseUrl);
          const result = await sql`SELECT NOW() as current_time, version() as pg_version`;

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: true,
                  message: 'Database connection successful',
                  data: result[0],
                }, null, 2),
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: false,
                  error: error instanceof Error ? error.message : 'Unknown error',
                }, null, 2),
              },
            ],
          };
        }
      },
    },
  ],
  resources: [
    {
      uri: 'deployment://status',
      name: 'Deployment Status',
      description: 'Current deployment configuration and status',
      mimeType: 'application/json',
      handler: async () => {
        return {
          contents: [
            {
              uri: 'deployment://status',
              mimeType: 'application/json',
              text: JSON.stringify({
                projectName: 'gencatsite',
                framework: 'vite',
                runtime: 'nodejs20.x',
                apiDirectory: 'api/',
                outputDirectory: 'dist',
                timestamp: new Date().toISOString(),
                environment: process.env.VERCEL_ENV || 'local',
              }, null, 2),
            },
          ],
        };
      },
    },
  ],
  prompts: [
    {
      name: 'diagnose-deployment',
      description: 'Diagnose deployment issues with the API functions',
      arguments: [],
      handler: async () => {
        return {
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: 'Check if API functions are deploying correctly by verifying environment variables and testing database connectivity.',
              },
            },
          ],
        };
      },
    },
  ],
});

// Export the handler for all HTTP methods
export default async function mcpEndpoint(req: VercelRequest, res: VercelResponse) {
  return handler(req, res);
}

// Also export named handlers for explicit method routing
export const GET = handler;
export const POST = handler;
export const DELETE = handler;
