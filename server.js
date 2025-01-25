import "dotenv/config";
import app from './app.js';
import resetDatabase from './resetDataBase.js';

const host = "localhost";
const port = process.env.PORT || 3000;

// resetDatabase().then(() => {
//     console.log("Base de datos reiniciada al iniciar el servidor.");
// });

// const RESTART_INTERVAL = 2 * 60 * 1000;
// console.log(RESTART_INTERVAL)

// setInterval(async () => {
//     console.log("Iniciando reinicio automático de la base de datos...");
//     await resetDatabase();
// }, RESTART_INTERVAL);

app.listen(port, () => {
    console.log(`environment: ${process.env.NODE_ENV}`);
    console.log(`server is running on http://${host}:${port}`);
});