import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  username: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};
