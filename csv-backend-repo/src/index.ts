// src/index.ts
import express, { Request, Response } from 'express';
import uploadRouter from './routes/upload';

const app = express();
const PORT = process.env.PORT || 8080;
app.use('/api', uploadRouter);
app.use('/api', uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
