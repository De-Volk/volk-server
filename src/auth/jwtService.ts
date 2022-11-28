import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import { CustomMiddleWareModel } from "../types/CustomMiddleWareModel";

const extractToken = (auth:string) =>{
    const TOKEN_PREFIX = "Bearer";
    const token = auth?.includes(TOKEN_PREFIX) ? auth.split(TOKEN_PREFIX)[1]:auth;
    return token;
}

const createAccessToken = async (email:string,id:string,nickname:string) =>{
    return jwt.sign({
        email:email,
        id: id,
        nickname: nickname
    },
    process.env.JWT_ACCESS_SECRET!,
    {
        expiresIn: "30m",
        issuer: "Volk"
    });
}

const createRefreshToken = async (id:string) =>{
    return jwt.sign({
        id: id,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
        expiresIn: "7 days",
        issuer: "Volk"
    });
}

const jwtTokenProvider ={
    getUserInfoFromToken: async (req:CustomMiddleWareModel,res:Response,next:NextFunction) =>{
        const token = extractToken(req.headers.authorization!);
        if (!token) return res.status(400).json({status:400,message: "인증을 위한 토큰이 존재하지 않습니다."});

        try{
            
            const decodedToken:any = jwt.verify(token!, process.env.JWT_ACCESS_SECRET!);
            req.email = decodedToken?.email;
            req.id = decodedToken?.id;
            req.nickname = decodedToken?.nickname;
            next()

        } catch(error:any){
            console.log(error.name);
            if(error.name === 'TokenExpiredError'){
                return res.status(419).json({status:419,message: "토큰이 만료되었습니다."});
            } else{
                return res.status(401).json({status:401,message: "유효하지 않은 토큰입니다."});
            }
        }
    },
    
    reissueToken: async (req:Request,res:Response) => {
        const accessToken = extractToken(req.headers.authorization!);
        if (!accessToken) return res.status(400).json({status:400,message: "인증을 위한 A토큰이 존재하지 않습니다."});

        const refreshToken = extractToken((req.headers.refreshtoken as string));
        if (!refreshToken) return res.status(400).json({status:400,message: "인증을 위한 R토큰이 존재하지 않습니다."});
        
        try{

            const decodedAccessToken:any = jwt.verify(accessToken!, process.env.JWT_ACCESS_SECRET!);
            const decodedRefreshToken:any = jwt.verify(refreshToken!, process.env.JWT_REFRESH_SECRET!);

            if(decodedAccessToken?.id == decodedRefreshToken?.id){
                const email = decodedAccessToken?.email;
                const id = decodedAccessToken?.id;
                const nickname = decodedAccessToken?.nickname;
    
                const accessToken = await createAccessToken(email,id,nickname);
                const refreshToken = await createRefreshToken(id);
                
                return res.status(200).json({status:200,messeage:"토큰 재발행 성공",accessToken,refreshToken})
            } else{
                return res.status(403).json({status:403,messeage:"토큰 재발행 실패"})
            }

        } catch(error:any){
            console.log(error.name);
            if(error.name === 'TokenExpiredError'){
                return res.status(419).json({status:419,message: "토큰이 만료되었습니다."});
            } else{
                return res.status(401).json({status:401,message: "유효하지 않은 토큰입니다."});
            }
        }
    },
    issueAccessToken: createAccessToken,
    issueRefreshToken: createRefreshToken,
    
}

export default jwtTokenProvider;