import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}
class CreateUserService {

    async execute({ name, email, admin, password } : IUserRequest) {
      
      const usersRepository = getCustomRepository(UsersRepositories);

      if(!email) {
        throw new Error("Email is required")
      }

      const userAlreadyExists = await usersRepository.findOne({ 
        email,
      })

      if (userAlreadyExists) {
        throw new Error("User already exists")
      }

      const passwordHash = await hash(password, 8)

      const user = usersRepository.create({ name, email, admin, password: passwordHash })

      await usersRepository.save(user)

      return user;
    }
}

export { CreateUserService };