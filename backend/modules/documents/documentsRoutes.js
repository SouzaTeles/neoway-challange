import { Router } from 'express';
import  documentsController  from "./documentsController.js";
import { validate } from '../../middlewares/validate.js';
import { createDocumentDto } from './dtos/createDocumentDto.js';
import { updateDocumentDto } from './dtos/updateDocumentDto.js';
import { handleId } from '../../middlewares/handleId.js';

const router = Router();
router.get('/', documentsController.listDocuments);
router.get('/:id', handleId(), documentsController.getDocument);
router.patch('/:id', handleId(), validate(updateDocumentDto), documentsController.updateDocument);
router.post('/', validate(createDocumentDto), documentsController.registerDocument);
router.delete('/:id', handleId(), documentsController.deleteDocument);
export default router;