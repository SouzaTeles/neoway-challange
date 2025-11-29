import { Router } from 'express';
import documentsRoutes from '../modules/documents/documentsRoutes.js';
import statusRoutes from '../modules/status/statusRoutes.js';

const router = Router();
router.get('/', (req, res) => {
    res.send('API ok');
});
router.use('/documents', documentsRoutes);
router.use('/status', statusRoutes);
export default router;
