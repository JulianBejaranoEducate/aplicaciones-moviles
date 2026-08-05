import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

const serverBoostrap = new ServerBootstrap(app);
serverBoostrap.initialize();