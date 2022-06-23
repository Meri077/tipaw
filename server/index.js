import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});