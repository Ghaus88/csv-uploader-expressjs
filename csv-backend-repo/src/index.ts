// src/index.ts
import express from 'express';
import uploadRouter from './routes/upload';
import searchRouter from './routes/search';
import getDataRouter from './routes/data';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from your front-end origin
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    //credentials: true, // Allow credentials (cookies, etc.)
  })
);

app.options('*', cors());

app.use('/api', uploadRouter);
app.use('/api', getDataRouter);
app.use('/api', searchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
