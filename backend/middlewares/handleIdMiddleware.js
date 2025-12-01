export function handleIdMiddleware(schema) {
  return (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    req.params.id = id;
    return next();
  };
}