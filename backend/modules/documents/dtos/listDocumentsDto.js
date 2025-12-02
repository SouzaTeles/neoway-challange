import { z } from 'zod';

const TYPE_CPF = "CPF";
const TYPE_CNPJ = "CNPJ";
const ALLOWED_TYPES = [TYPE_CPF, TYPE_CNPJ];

export const listDocumentsDto = z.object({
    document: z.string().regex(/^\d+$/, 'O documento deve conter apenas números').optional(),
    type: z.enum(ALLOWED_TYPES).optional(),
    blocklisted: z.boolean().optional(),
    orderBy: z.enum(['asc', 'desc']).optional(),
})