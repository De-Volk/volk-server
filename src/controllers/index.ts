import express, {Request,Response,Router} from "express";
import account from "./accountControl";
import jwtService from "../auth/jwtService";

const router:Router = express.Router();

// 정상 동작 확인
router.get('/',jwtService.getUserInfoFromToken,(req:any, res:Response)=>{
    res.json({"status":200,"data":"정상 동작"})
});

// 회원가입
router.post('/signup',account.signUp);

// 로그인
router.post('/login',account.login);

// 토큰 재발행
router.post('/token',jwtService.reissueToken);

export default router;
