import express from 'express';
import { routes } from './routes';
import { Store } from './store';

export class Server {

    public app: express.Application;

    constructor() {
        this.app = express();

        this._buildRoutes().then(() => {
            // do nothing
        });

    }

    private _initConfig(): void {
        // TODO
    }

    private async _buildRoutes(): Promise<any> {

        const serverRoutes = routes.getRoutes();
        const store = new Store();

        for (let route of serverRoutes) {

            // e.g. order/add
            let splittedRoute = route.split('/');

            let Model = await import (`./models/${splittedRoute[0]}`);

            // e.g. set from order => Orders
            let uppercaseModel = splittedRoute[0].charAt(0).toUpperCase() + splittedRoute[0].slice(1);

            // TODO Allow only get/post requests
            this.app.use(`/${route}`, (req: any, res: any) => {

                let model = new Model[uppercaseModel](store);

                // e.g. addOrder
                let modelMethodName = `${splittedRoute[1]}${uppercaseModel}`;

                // call function
                model[modelMethodName]({name: "iulianTest"});

            });
        }
    }
}