import express from 'express';
import indexRoutes from './routes/routes.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
