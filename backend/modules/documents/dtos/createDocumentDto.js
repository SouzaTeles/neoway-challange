import { z } from "zod";
import { isValidCPF, isValidCNPJ } from "cnpj-cpf-validator";

const TYPE_CPF = "CPF";
const TYPE_CNPJ = "CNPJ";
const ALLOWED_TYPES = [TYPE_CPF, TYPE_CNPJ];

const validateCPForCNPJ = (data, ctx) => {
  const clean = data.document.replace(/\D/g, "");
  const type = data.type;

  if (type == TYPE_CPF && !isValidCPF(clean)) {
    ctx.addIssue({
      code: "custom",
      message: "CPF inválido",
    });
    return z.NEVER;
  }

  if (type == TYPE_CNPJ && !isValidCNPJ(clean)) {
    ctx.addIssue({
      code: "custom",
      message: "CNPJ inválido",
    });
    return z.NEVER;
  }

  data.document = clean;
  return data;
}

export const createDocumentDto = z.object({
  document: z.string().min(11, "O número do documento é obrigatório e deve ter no mínimo 11 dígitos"),
  type: z.enum(ALLOWED_TYPES, {
    required_error: "O tipo do documento é obrigatório",
    invalid_type_error: "O tipo do documento deve ser 'CPF' ou 'CNPJ'"
  }),
  blocklisted: z.boolean().optional(),
}).transform(validateCPForCNPJ);

