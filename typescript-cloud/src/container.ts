import { UserRepository } from "./repositories";
import { UserService } from "./services";
import { UserController } from "./controllers";

// Initialisation des dépendances
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userRepository, userService, userController };
