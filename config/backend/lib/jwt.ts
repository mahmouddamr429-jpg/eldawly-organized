import jwt from 'jsonwebtoken';
const S = process.env.JWT_SECRET || 'el-dawly-dessert-dev-secret-2024';
export const signToken = (p: { userId: number; role: string }) => jwt.sign(p, S, { expiresIn: '7d' });
export const verifyToken = (t: string) => jwt.verify(t, S) as { userId: number; role: string };
