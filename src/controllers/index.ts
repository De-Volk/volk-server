import express, {Response,Router} from "express";
import account from "./accountControl";
import jwtService from "../auth/jwtService";
import { CustomRequest } from "../types/CustomTypes";

const router:Router = express.Router();

// 정상 동작 확인
router.get('/',jwtService.getUserInfoFromToken,(req:CustomRequest, res:Response)=>{
    res.json({"status":200,"data":"정상 동작"})
});

// 회원가입
router.post('/signup',account.signUp);

// 로그인
router.post('/login',account.login);

// 토큰 재발행
router.post('/token',jwtService.reissueToken);

export default router;
