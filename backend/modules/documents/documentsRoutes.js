import { Router } from 'express';
import  documentsController  from "./documentsController.js";
import { validate } from '../../middlewares/validate.js';
import { createDocumentDto } from './dtos/createDocumentDto.js';

const router = Router();
router.get('/', documentsController.listDocuments);
router.get('/:id', documentsController.getDocument);
router.put('/:id', documentsController.updateDocument);
router.post('/', validate(createDocumentDto), documentsController.registerDocument);
router.delete('/:id', documentsController.deleteDocument);
export default router;