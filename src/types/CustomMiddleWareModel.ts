import { Request } from "express";

export interface CustomMiddleWareModel extends Request {
    email?: string;
    id?: string;
    nickname?: string;
}

