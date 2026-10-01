import jwt from 'jsonwebtoken';

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET must be configured in production');
  return 'el-dawly-dessert-local-development-only';
}

export const signToken = (payload: { userId: number; role: string }) =>
  jwt.sign(payload, getSecret(), { expiresIn: '7d' });

export const verifyToken = (token: string) =>
  jwt.verify(token, getSecret()) as { userId: number; role: string };
