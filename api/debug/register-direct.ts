import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { default: registerHandler } = await import('../auth/register.js');

    const mockReq: Partial<VercelRequest> = {
      method: 'POST',
      headers: { host: req.headers.host ?? 'iamatrust.com' },
      url: '/api/auth/register?debug=1',
      body: {
        username: 'direct_debug_user',
        email: 'direct-debug@example.com',
        password: 'Passw0rd!123',
        firstName: 'Direct',
        lastName: 'Debug',
      },
    };

    const result: Record<string, unknown> = {};

    const mockRes: Partial<VercelResponse> = {
      statusCode: 200,
      headers: {},
      status(code: number) {
        this.statusCode = code;
        return this as VercelResponse;
      },
      setHeader(name: string, value: string | string[]) {
        (this.headers as Record<string, string | string[]>)[name] = value;
      },
      json(payload: unknown) {
        result.statusCode = this.statusCode;
        result.body = payload;
        result.headers = this.headers;
        return this as VercelResponse;
      },
    };

    await registerHandler(mockReq as VercelRequest, mockRes as VercelResponse);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
