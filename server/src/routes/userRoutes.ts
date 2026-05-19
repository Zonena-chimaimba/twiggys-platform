import { Router } from 'express';
import { login, getMe } from '../controllers/authController.ts';
import { getSubmissions, getSubmission, updateSubmissionStatus, getStats } from '../controllers/submissionsController';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = Router();

// Public admin auth routes (no middleware)
router.post('/login', login);
router.get('/me', getMe);

// Protected admin routes
router.get('/stats', authMiddleware, getStats);
router.get('/submissions', authMiddleware, getSubmissions);
router.get('/submissions/:id', authMiddleware, getSubmission);
router.patch('/submissions/:id/status', authMiddleware, updateSubmissionStatus);

export default router;