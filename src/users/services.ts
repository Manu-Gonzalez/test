import { UserRepository, User, UserWithOutPassword, UserWithOutId } from "./repository/userRepository";
import UserPrismaRepository from "./repository/prismaUserRepository"
export default class UserService {
    constructor(private userAuth: UserRepository) { }
    async register(user: UserWithOutId): Promise<UserWithOutPassword | Error> {
        console.log(this.userAuth.register(user));
        return await this.userAuth.register(user);
    }
    async getAllUsers(): Promise<UserWithOutPassword[]> {
        console.log(this.userAuth.getAllUsers());
        return await this.userAuth.getAllUsers();
    }

    async getUserById(id: number): Promise<UserWithOutPassword | undefined> {
        console.log(this.userAuth.getUserById(id));
        return await this.userAuth.getUserById(id);
    }
}


