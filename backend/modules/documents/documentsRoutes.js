import { Router } from 'express';
import  documentsController  from "./documentsController.js";
import { validate } from '../../middlewares/validate.js';
import { createDocumentDto } from './dtos/createDocumentDto.js';
import { updateDocumentDto } from './dtos/updateDocumentDto.js';
import { handleId } from '../../middlewares/handleId.js';
import { errorHandler } from '../../middlewares/errorHandler.js';

const router = Router();
router.get('/', documentsController.listDocuments);
router.get('/:id', handleId(), documentsController.getDocument);
router.patch('/:id', handleId(), validate(updateDocumentDto), documentsController.updateDocument, errorHandler);
router.post('/', validate(createDocumentDto), documentsController.registerDocument, errorHandler);
router.delete('/:id', handleId(), documentsController.deleteDocument, errorHandler);
export default router;