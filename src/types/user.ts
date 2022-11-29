export type userDto = {
    email: string;
    password: string;
    nickname: string,
    gender: string,
    birth: number,
    createdAt: Date,
}

export type userLoginDto = {
    email: string;
    password: string;
}
