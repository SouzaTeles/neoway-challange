import { Router } from 'express';
import  documentsController  from "./documentsController.js";
import { validateSchemaMiddleware } from '../../middlewares/validateSchemaMiddleware.js';
import { listDocumentsDto } from './dtos/listDocumentsDto.js';
import { updateDocumentDto } from './dtos/updateDocumentDto.js';
import { createDocumentDto } from './dtos/createDocumentDto.js';
import { handleIdMiddleware } from '../../middlewares/handleIdMiddleware.js';
import { errorHandlerMiddleware } from '../../middlewares/errorHandlerMiddleware.js';

const router = Router();
router.get('/', validateSchemaMiddleware(listDocumentsDto, true), documentsController.listDocuments, errorHandlerMiddleware);
router.get('/:id', handleIdMiddleware(), documentsController.getDocument, errorHandlerMiddleware);
router.patch('/:id', handleIdMiddleware(), validateSchemaMiddleware(updateDocumentDto), documentsController.updateDocument, errorHandlerMiddleware);
router.post('/', validateSchemaMiddleware(createDocumentDto), documentsController.registerDocument, errorHandlerMiddleware);
router.delete('/:id', handleIdMiddleware(), documentsController.deleteDocument, errorHandlerMiddleware);
export default router;