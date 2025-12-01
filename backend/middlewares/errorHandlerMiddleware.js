import { Prisma } from '@prisma/client';

const PRISMA_ERROR_CODES = {
    UNIQUE_CONSTRAINT: 'P2002',
    RECORD_NOT_FOUND: 'P2025'
};

export function errorHandlerMiddleware(err, req, res, next) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
            return res.status(409).json({
                error: "Registro em duplicidade",
            });
        }

        if (err.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
            return res.status(404).json({
                error: "Registro não encontrado",
            });
        }
    }

    res.status(500).json({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Ocorreu um erro inesperado'
    });
}