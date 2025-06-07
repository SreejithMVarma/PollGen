import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './utils/logger';
import transcribeRouter from './routes/transcribe';
// import pollRouter from "./routes/poll";
import 'dotenv/config'; 

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use morgan for HTTP logging integrated with pino
app.use(morgan('combined'));

// Routes
app.use('/api', transcribeRouter);
// app.use("/poll", pollRouter);

// Generic error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
