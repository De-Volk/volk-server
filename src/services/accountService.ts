import { userDto } from "../@type/user"
import { basicResponse,resultResponse } from "../config/response";

const emailRegex = /^[\w\.]+@[\w](\.?[\w])*\.[a-z]{2,3}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*\W).{8,16}$/i;

const AccountService = {

    signUp: async (user:userDto) => {
        const email = user.email.trim();
        const password = user.password.trim();
        if (email == '' || password == ''){
            return basicResponse('빈 문자열입니다.',400)
        };
        return basicResponse("회원가입 TEST")
    }
}


export default AccountService;