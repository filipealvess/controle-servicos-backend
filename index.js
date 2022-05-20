import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './src/routes.js';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3333, () => {
  console.log(`Backend is running in localhost:${port}...`);
});
