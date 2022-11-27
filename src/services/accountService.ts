import { userDto } from "../@type/user"
import { basicResponse,resultResponse } from "../config/response";
import User from "../models/user";
import bcrypt from "bcrypt";

const emailRegex = /^[\w\.]+@[\w](\.?[\w])*\.[a-z]{2,3}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*\W).{8,16}$/i;

const AccountService = {

    signUp: async (user:userDto) => {
        const email = user.email.trim();
        const password = user.password.trim();
        const {nickname,birth,gender} = user;


        if (email == '' || password == '' || nickname == '' || birth == undefined || gender == ''){
            return basicResponse('빈 문자열입니다.',400);
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

            if (foundUser) return basicResponse('이미 가입한 유저입니다.',409)

            // 비밀번호 암호화
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const hashedPassword = await bcrypt.hash(password,salt);
            
            // 유저 저장
            const newUser = await new User({email:email,password:hashedPassword,nickname,birth,gender}).save();
            console.log(hashedPassword);

            return resultResponse("회원 가입 성공",200,{"email":email,"id":newUser.id});

        }
        
    },
}


export default AccountService;