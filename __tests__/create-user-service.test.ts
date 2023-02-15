import { User } from "../src/interfaces/User";
import { UserService } from "../src/services/UserService/user-service";

describe("Create user", () => {
    it("should be able to create an user", async () => {
        const userService = new UserService;
        const userData: User = {
            username: "joao",
            email: "joao@email.com",
            password: "teste123"
        }

        const user = await userService.createUser(userData)
        expect(user).toHaveProperty("id")
    })
})