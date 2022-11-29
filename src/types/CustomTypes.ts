import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    email?: string;
    id?: string;
    nickname?: string;
}

export interface CustomJwtPayload extends JwtPayload{
    email?: string;
    id?: string;
    nickname?: string;
}

