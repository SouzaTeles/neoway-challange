import express from 'express';
import indexRoutes from './routes/routes.js';
import { countRequest } from './middlewares/requestCounterMiddleware.js';

const app = express();
const port = 3000;

app.use(countRequest);
app.use(express.json());
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
