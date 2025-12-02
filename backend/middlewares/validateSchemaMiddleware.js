export function validateSchemaMiddleware(schema, query = false) {
  return (req, res, next) => {
    const dataToValidate = query ? req.query : req.body;
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: result.error.format(),
      });
    }

    req.validated = result.data;
    next();
  };
}