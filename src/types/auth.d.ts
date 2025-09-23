export type CreateUserData = {
    name: string;
    email: string;
    hashedPassword: string;
    profileImage?: string;
};

export type LoginData = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export interface LoginResponse {
    token: string;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
    profileImage: string | null;
    createdAt: Date;
}
roles: {
    memberships: Array<{
        id: string;
        role: string;
        team: {
            id: string;
            name: string;
        };
    }>;
    ownedTeams: Array<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
}
