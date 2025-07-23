import express from 'express';
import cors from 'cors';
import { logger } from './middlewares/logger.middleware';
import { notFound, errorHandler } from './middlewares/error.middleware';
import authRouter from './routes/auth.route';
import pageRouter from './routes/page.route';
import blockRouter from './routes/block.route';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(logger);

app.use('/api/auth', authRouter);
app.use('/api/pages', pageRouter);
app.use('/api/blocks', blockRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
