import { userDto, userLoginDto } from "../types/user"
import { basicResponse,resultResponse } from "../config/response";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwtService from "../auth/jwtService";


const emailRegex = /^[\w\.]+@[\w](\.?[\w])*\.[a-z]{2,3}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*\W).{8,16}$/i;

const userValueError = (value:string|number|Date) =>{
    return value === "" || value === undefined || value === null;
};

const AccountService = {

    signUp: async (user:userDto) => {
        const email = user.email.trim();
        const password = user.password.trim();
        const {nickname,birth,gender} = user;
        const checkList = {email,password,nickname,birth,gender};

        const errorKey = Object.entries(checkList).reduce((errors:string[],[key,value])=>(userValueError(value)?[...errors,key]:errors),[]);

        if (errorKey.length > 0){
            return basicResponse(errorKey+' 값의 입력이 없습니다.',400);
        } 
        else if(!emailRegex.test(email)) {
            return basicResponse('잘못된 이메일 형식입니다.',400);
        }
        else if(!passwordRegex.test(password)){
            return basicResponse('비밀번호는 영어, 숫자, 특수문자 혼용 8자 이상이어야 합니다.',400);
        } 
        else{

            // 유저 검증
            const foundUser = await User.findOne({email});

            if (foundUser) return basicResponse('이미 가입한 유저입니다.',409);

            // 비밀번호 암호화
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const hashedPassword = await bcrypt.hash(password,salt);

            // 유저 저장
            const newUser = await new User({email:email,password:hashedPassword,nickname,birth,gender}).save();

            return resultResponse("회원 가입 성공",200,{"email":email,"id":newUser.id});

        }
    
    },

    login: async (user:userLoginDto) =>{

        const {email,password} = user;
        const checkList = {email,password};

        const errorKey = Object.entries(checkList).reduce((errors:string[],[key,value])=>(userValueError(value)?[...errors,key]:errors),[]);

        if (errorKey.length>0){
            return basicResponse(errorKey+'가 없습니다.',400);
        } else {

            const foundUser = await User.findOne({email});

            if (!foundUser) return basicResponse('존재하지 않는 계정입니다.',401);

            const passwordCheck = await bcrypt.compare(password,foundUser.password);

            if (!passwordCheck) return basicResponse('잘못된 비밀번호입니다.',401);

            const accessToken = await jwtService.issueAccessToken(foundUser.email,foundUser._id,foundUser.nickname);
            const refreshToken = await jwtService.issueRefreshToken(foundUser._id);

            return resultResponse("로그인 성공",200,{email,nickname:foundUser.nickname,accessToken,refreshToken});
        }

    },
}


export default AccountService;