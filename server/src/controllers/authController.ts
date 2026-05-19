import type { Request, Response } from 'express';
import { loginAdmin } from '../services/authService.ts';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ success: false, message: 'Username and password are required' });
      return;
    }

    const result = await loginAdmin(username, password);
    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({ success: false, message });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'No token provided' })
      return
    }

    const token = authHeader.substring(7)
    const payload = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; username: string }

    res.status(200).json({
      success: true,
      data: {
        admin: {
          id: payload.id,
          email: payload.username,
          name: null,
        }
      }
    })
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
};
