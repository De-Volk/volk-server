export type userDto = {
    email: string;
    password: string;
    nickname: String,
    gender: String,
    birth: Number,
    createdAt: Date,
}

export type userLoginDto = {
    email: string;
    password: string;
}
