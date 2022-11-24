import { userDto } from "../@type/user"
import { basicResponse,resultResponse } from "../config/response";

const emailRegex = /^[\w\.]+@[\w](\.?[\w])*\.[a-z]{2,3}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*\W).{8,16}$/i;

const AccountService = {

    signUp: async (user:userDto) => {
        const email = user.email.trim();
        const password = user.password.trim();

        if (email == '' || password == ''){
            return basicResponse('빈 문자열입니다.',400);
        } 
        else if(!emailRegex.test(email)) {
            return basicResponse('잘못된 이메일 형식입니다.',400);
        }
        else if(!passwordRegex.test(password)){
            return basicResponse('비밀번호는 영어, 숫자, 특수문자 혼용 8자 이상이어야 합니다.',400);
        } 
        else{
            // 회원가입 로직 추가
            return resultResponse("test",200,{"name":"장병희","age":13});
        }
        
    },
}


export default AccountService;