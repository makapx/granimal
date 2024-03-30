export type UserType = {
    id?: number;
    username: string;
    password?: string;
    picture?: string;
}

export type UserWithPassword = UserType & { password: string };
