import prisma from '../../prisma/prisma.js';
export class DocumentsRepository {
    async findByFilters(filters = {}) {
        const where = {};
        const {
            document,
            type,
            blocklisted,
            orderBy = 'desc'
        } = filters;

        if (document) {
            where.document = {
                contains: document
            };
        }

        if (type) {
            where.type = type;
        }

        if (blocklisted !== undefined) {
            where.blocklisted = blocklisted;
        }

        const orderByCreatedAt = { createdAt: orderBy };

        return prisma.document.findMany({ where, orderBy: orderByCreatedAt });
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

    async update(id, data) {
        return prisma.document.update({
            where: { id },
            data,
        });
    }
}