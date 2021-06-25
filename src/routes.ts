import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();

router.post("/users", createUserController.handle)
router.post("/tags", ensureAdmin, createTagController.handle) //rota, middleware, controller
router.post("/login", authenticateUserController.handle)
router.post("/compliments", complimentController.handle)

export { router };