import { Router } from 'express';
import documentsRoutes from '../modules/documents/documentsRoutes.js';
import statusRoutes from '../modules/status/statusRoutes.js';
import authRoutes from '../modules/auth/authRoutes.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/documents', authMiddleware, documentsRoutes);
router.use('/status', authMiddleware, statusRoutes);
export default router;
