import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './src/routes.js';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(router);

app.listen(3333, () => {
  console.log(`Backend is running in localhost:${port}...`);
});
