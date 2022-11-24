import express from "express";
import controller from "./src/controllers";

const app = express();

const PORT=3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/',controller);

app.listen(PORT, ()=>{
    console.log("서버 가동");
    console.log("http://localhost:"+PORT);
})