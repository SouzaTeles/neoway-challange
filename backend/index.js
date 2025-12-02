import cors from "cors";
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRoutes from './routes/routes.js';
import { countRequest } from './middlewares/requestCounterMiddleware.js';

const app = express();
const port = 3000;

app.use(countRequest);
app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
