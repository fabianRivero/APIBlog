import "dotenv/config";
import app from './app.js';
import { WebSocketServer } from "ws";
import http from "http";

const host = "localhost";
const port = process.env.PORT || 3000;
// const server = http.createServer(app);
// const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//     console.log("Nuevo cliente WebSocket conectado");

//     // Mensaje inicial al cliente
//     ws.send(JSON.stringify({ message: "Conexión WebSocket establecida" }));

//     ws.on("message", (data) => {
//         console.log("Mensaje recibido del cliente:", data.toString());
//     });

//     ws.on("close", () => {
//         console.log("Cliente WebSocket desconectado");
//     });
// });

// // Iniciar el servidor HTTP + WebSocket
// server.listen(port, () => {
//     console.log(`Environment: ${process.env.NODE_ENV}`);
//     console.log(`Server is running on http://${host}:${port}`);
// });

app.listen(port, () => {
    console.log(`environment: ${process.env.NODE_ENV}`);
    console.log(`server is running on http://${host}:${port}`);
});