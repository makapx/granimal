export type User = {
    id?: number;
    username: string;
    password?: string;
    picture?: string;
}

export type UserWithPassword = User & { password: string };
