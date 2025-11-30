export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

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