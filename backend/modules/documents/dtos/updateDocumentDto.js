import { z } from 'zod';

export const updateDocumentDto = z.object({
  blocklisted: z.boolean().optional(),
}).strict();
