import express, {Request,Response,Router} from "express";
import account from "./accountControl";

const router:Router = express.Router();

// 정상 동작 확인
router.get('/',(req:Request, res:Response)=>{
    res.json({"status":200,"data":"정상 동작"})
});

//회원가입
router.post('/signup',account.signUp);

export default router;
