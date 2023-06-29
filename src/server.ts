import { AddressInfo } from "net";
import { createServer } from "./config/express";
import http from "http";


const port = process.env.PORT || 3000;

const startServer = async () => {
    const app = createServer();
    
    const server = http.createServer(app).listen({ port }, () => {
        const adressInfo = server.address() as AddressInfo;
        console.log(`🚀 Server is running on http://localhost:${adressInfo.port}`);
    })
}

startServer();

