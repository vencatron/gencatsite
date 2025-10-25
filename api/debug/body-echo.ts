import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const info: Record<string, unknown> = {
    method: req.method,
    headers: req.headers,
    typeofBody: typeof req.body,
    hasBody: req.body !== undefined,
  };

  if (typeof req.body === 'string') {
    info.stringBody = req.body;
  }

  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    info.objectKeys = Object.keys(req.body as Record<string, unknown>);
    info.bodyValue = req.body;
  }

  const rawBody = (req as unknown as { rawBody?: unknown }).rawBody;
  if (rawBody) {
    info.rawBodyType = Buffer.isBuffer(rawBody) ? 'buffer' : typeof rawBody;
    info.rawBodyLength = Buffer.isBuffer(rawBody) ? rawBody.length : String(rawBody).length;
    info.rawBodyPreview = Buffer.isBuffer(rawBody)
      ? rawBody.toString('utf8').slice(0, 200)
      : String(rawBody).slice(0, 200);
  }

  return res.status(200).json(info);
}
