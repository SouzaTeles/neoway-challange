import { Router } from 'express';
import  documentsController  from "./documentsController.js";

const router = Router();
router.get('/', documentsController.listDocuments);
router.get('/:id', documentsController.getDocument);
router.put('/:id', documentsController.updateDocument);
router.post('/', documentsController.registerDocument);
router.delete('/:id', documentsController.deleteDocument);
export default router;