import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

const serverBoostrap = new ServerBootstrap(app);

/**
 * Función clásica
*/

async function startServer(){
    try {
        const instances = [serverBoostrap.initialize()];
        Promise.all(instances);
    } catch (error) {
        console.error(error);
    }
}

// startServer();

/**
 * Función tipo flecha =>
*/

const startingServer = async() => {
    try {
        const instances = [serverBoostrap.initialize()];
        Promise.all(instances);
    } catch (error) {
        console.error(error);
    }
}

// startingServer();

/**
 * Función tipo autoinvocada y anonima
*/

(async () => {
    try {
        const instances = [serverBoostrap.initialize()];
        Promise.all(instances);
    } catch (error) {
        console.error(error);
    }
})();

// serverBoostrap.initialize(); 