import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import controller from "./src/controllers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));
app.use("/",controller);

mongoose.connect('mongodb://localhost:27017/volk', {});
const db = mongoose.connection;

db.once('open', () => console.log('mongoose connected'));
db.on('error', (error) => console.error('DB Error', error));

app.listen('8000', () => {
  console.log('server start');
});
