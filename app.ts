import express from "express";
import controller from "./src/controllers";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const {PORT, MONGO_URI} = process.env;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/',controller);

//CONNECTnpm TO MONGODB SERVER
mongoose
  .connect(MONGO_URI!)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.listen(PORT, ()=>{
    console.log("서버 가동");
    console.log("http://localhost:"+PORT);
})