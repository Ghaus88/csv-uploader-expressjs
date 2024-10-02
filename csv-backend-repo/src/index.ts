// src/index.ts
import express from 'express';
import uploadRouter from './routes/upload';
import searchRouter from './routes/search';
import getDataRouter from './routes/data';

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/api', uploadRouter);
app.use('/api', getDataRouter);
app.use('/api', searchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
