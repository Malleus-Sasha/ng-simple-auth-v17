import { User } from "./user";

export interface UserAuth {
    accessToken: string;
    user: User;
}
