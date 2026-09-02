import express, {type Request, type Response} from "express";
 
class App{
    private app: express.Application = express();
    constructor(){
        this.app = express();
        this.routes();
    }

    // Método para rutas
    private routes(): void {
        this.app.get("/",(req: Request, res: Response)=> res.send("Holis"));
    } 
 
    getApp(){
        return this.app;
    }
}
export default new App().getApp();