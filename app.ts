import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import controller from "./src/controllers";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const {PORT,MONGO_URI} = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));
app.use("/",controller);

mongoose.connect(MONGO_URI!, {});
const db = mongoose.connection;

db.once('open', () => console.log('mongoose connected'));
db.on('error', (error) => console.error('DB Error', error));

app.listen(PORT, () => {
  console.log('server start');
  console.log('http://localhost:'+PORT);
});
