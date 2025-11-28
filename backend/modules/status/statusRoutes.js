import { Router } from 'express';
import { getStatus } from "./statusController.js";
const router = Router();
router.get('/', getStatus);
export default router;