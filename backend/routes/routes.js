import { Router } from 'express';
import statusRoutes from '../modules/status/statusRoutes.js';

const router = Router();
router.get('/', (req, res) => {
    res.send('API ok');
});
router.use('/status', statusRoutes);
export default router;
