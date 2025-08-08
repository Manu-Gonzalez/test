import UserService from "./services";
import { UserWithOutPassword, User, UserWithOutId } from "./repository/userRepository";
import { ExpressFunction } from "../shared/types/ExpressFunction"


export default class UserController {
    constructor(private userService: UserService) { }

    public register: ExpressFunction = async (req, res, next) => {
        try {
            const user: User = req.body;
            if (!user) return res.status(400).json({ message: "error, ingrese todos los campos" });
            await this.userService.register(user);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: "error del servidor" });
        }
    };

    public getAll: ExpressFunction = async (req, res, next) => {
        try {
            const users = await this.userService.getAllUsers();
            console.log(users)
            return res.json(users);
        } catch (error: any) {
            res.status(400).json({ message: "error interno del servidor" });
        }
    };

    public getById: ExpressFunction = async (req, res, next) => {
        try {
            const userId = parseInt(req.params.id);
            const user = await this.userService.getUserById(userId);

            if (!user) return res.json({ message: "usuario inexistente" });

            return res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: "error, ingrese el id" });
        }
    };
}
