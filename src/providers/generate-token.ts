import jwt from 'jsonwebtoken';


export class GenerateTokenProvider {
    async generateToken(id: number) {
        const token = jwt.sign({user_id: id}, "036799f4-a33a-4765-a9cc-1f95e644fe5a", {
            expiresIn: "1hr"
        })
        return token
    }
} 