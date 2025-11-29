import { DocumentsRepository } from './documentsRepository.js';

const documentsRepository = new DocumentsRepository();

export default {
    registerDocument: async (req, res) => {
        const { document, type, blocklisted } = req.body;
        const createdDocument = await documentsRepository.create(document, type, blocklisted);
        return res.status(201).json(createdDocument);
    }
}