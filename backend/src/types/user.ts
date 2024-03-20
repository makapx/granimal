export type User = {
    uid: string;
    name: string;
    email: string;
    picture?: string;
}

export type UserWithPassword = User & { password_hash: string };
