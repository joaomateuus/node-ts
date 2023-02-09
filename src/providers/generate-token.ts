import jwt from 'jsonwebtoken';


export class GenerateTokenProvider {
    async generateToken() {
        const token = jwt.sign({}, "036799f4-a33a-4765-a9cc-1f95e644fe5a", {
            expiresIn: "1hr"
        })
        return token
    }
} 