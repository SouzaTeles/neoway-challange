import { DocumentsRepository } from './documentsRepository.js';

const documentsRepository = new DocumentsRepository();

export default {
    registerDocument: async (req, res) => {
        const { document, type, blocklisted } = req.body;
        const createdDocument = await documentsRepository.create(document, type, blocklisted);
        return res.status(201).json(createdDocument);
    },
    listDocuments: async (req, res) => {
        const documents = await documentsRepository.findAll();
        return res.json(documents);
    },
    updateDocument: async (req, res) => {
        const document = await documentsRepository.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Documento não encontrado' });
        }
        const updatedDocument = await documentsRepository.update(req.params.id, req.body);
        return res.json(updatedDocument);
    },
    deleteDocument: async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            await documentsRepository.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).json({ message: 'Documento não encontrado' });
        }
    },
    getDocument: async (req, res) => {
        const id = parseInt(req.params.id);
        const document = await documentsRepository.findById(id);
        if (!document) {
            return res.status(404).json({ message: 'Documento não encontrado' });
        }
        return res.send(document);
    }
}