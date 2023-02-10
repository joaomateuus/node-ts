import { UserService } from "../src/services/UserService/user-service";

const userService = new UserService;

describe("Create user", () => {
    it("It must be possible create an user", () => {
        //code
        expect(2 + 2).toBe(4)
    })
})