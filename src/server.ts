import { AddressInfo } from "net";
import { createServer } from "./config/express";
import http from "http";
import { userRoutes } from "./routes/auth-routes"

const port = process.env.PORT || 3000;

const startServer = async () => {
    const app = await createServer();
    app.use('/account/auth', userRoutes)
    const server = http.createServer(app).listen({ port }, () => {
        const adressInfo = server.address() as AddressInfo;
        console.log(`🚀 Server is running on http://localhost:${adressInfo.port}`);
    })
}

startServer();

