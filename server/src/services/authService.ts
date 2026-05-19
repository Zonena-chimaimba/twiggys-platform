import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.ts';
import { generateToken } from '../utils/jwt.ts';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: {
      id: string;
      email: string;
      name?: string;
    };
  };
}

export const loginAdmin = async (username: string, password: string): Promise<LoginResponse> => {
  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: admin.id, username: admin.username });

  return {
    success: true,
    message: 'Login successful',
    data: {
      token,
      admin: {
        id: admin.id,
        email: admin.username,
      }
    }
  };
};
