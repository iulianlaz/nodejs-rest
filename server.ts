
import express = require('express');

export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.buildRoutes();
    }

    private initConfig(): void {
        // TODO
    }

    private buildRoutes(): void {
        this.app.get('/', function (req, res) {
            res.send('Hello World!');
        });
    }
}