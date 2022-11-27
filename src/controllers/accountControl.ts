import {Request,Response} from "express";
import AccountService from "../services/accountService";

const account = {
    
    signUp: async (req:Request, res:Response) => {
        
        const userDTO = req.body;
        const result = await AccountService.signUp(userDTO);

        res.status(result.status).json(result)
    },


}

export default account;