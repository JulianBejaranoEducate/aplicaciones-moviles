import app from "./infraestucture/web/app";
import { ServerBootstrap } from "./infraestucture/bootstrap/server.bootstrap";

const serverBootstrap = new ServerBootstrap(app);
//Función clásica de TS ó JS
async function startServer() {
    try {
        const instances = [serverBootstrap.initialize()];
        await Promise.all(instances);
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

//Función tipo fecla =>
const startingServer =  async() => {
    try {
        const instances = [serverBootstrap.initialize()];
        await Promise.all(instances);
    } catch (error) {
        console.error("Error starting server:", error);
    }
}
// Llamar la función -->  startServer();

// función AUTO invocada
(async () => {
    try {
        const instances = [serverBootstrap.initialize()];
        await Promise.all(instances);
    } catch (error) {
        console.error("Error starting server:", error);
    }
})();