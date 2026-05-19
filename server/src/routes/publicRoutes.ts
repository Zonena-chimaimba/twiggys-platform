import { Router } from 'express';
import { createSubmission } from '../controllers/submissionsController';
import { signUpload } from '../controllers/uploadsController';

const router = Router();

// Public submission routes
router.post('/submissions', createSubmission);

// Upload signing route
router.post('/uploads/sign', signUpload);

export default router;
