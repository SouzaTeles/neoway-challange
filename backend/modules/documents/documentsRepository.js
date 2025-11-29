import prisma from '../../prisma/prisma.js';
export class DocumentsRepository {
    async findAll() {
        return prisma.document.findMany();
    }

    async create(document, type, blocklisted = false) {
        return prisma.document.create({
            data: { document, type, blocklisted },
        });
    }

    async delete(id) {
        return prisma.document.delete({
            where: { id },
        });
    }

    async findById(id) {
        return prisma.document.findUnique({ where: { id } });
    }
}