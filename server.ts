import * as bodyParser from 'body-parser';
import express from 'express';
import { routes } from './routes';
import { Store } from './store';

export class Server {

    private _getMethodName = 'get';
    private _getByIdMethodName = 'getById';
    private _addMethodName = 'add';
    private _updateMethodName = 'update';

    private _allowHTTPMethods = ['POST', 'PUT']

    public app: express.Application;

    constructor() {
        this.app = express();

        this._preProcessRequest();

        this._buildRoutes().then(() => {
            // do nothing
        });

    }

    private _initConfig(): void {
        // TODO
    }

    private _preProcessRequest(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        // https://enable-cors.org/server_expressjs.html
        this.app.use((req: any, res: any, next: any) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'POST, PUT, GET');

            next();
        });
    }

    /**
     * Builds all available routes
     * @returns {Promise<any>}
     * @private
     */
    private async _buildRoutes(): Promise<any> {

        const serverRoutes = routes.getRoutes();
        const store = new Store();

        for (let route of serverRoutes) {

            // E.g. order/add
            let splittedRoute = route.split('/');

            // Load all models business logic
            let Model = await import (`./models/${splittedRoute[0]}`);

            // E.g. set from order => Orders
            let uppercaseModel = splittedRoute[0].charAt(0).toUpperCase() + splittedRoute[0].slice(1);

            // TODO Allow only get/post requests
            this.app.use(`/${route}`, (req: any, res: any) => {

                this._processRequest(
                    {
                        uppercaseModel: uppercaseModel,
                        store: store,
                        splittedRoute: splittedRoute,
                        req: req,
                        res: res,
                        Model: Model
                    }
                )

            });
        }
    }

    private _processRequest(options: any) {
        let model = options['Model'][options['uppercaseModel']].getInstance(options['store']),
            operationParam = null;

        // Set response object for each model in order to send the response back
        model.initModel(
            {
                res: options['res']
            }
        );

        if ((options['splittedRoute'].length > 1)) {

            // e.g. Format: add/update/delete/:id
            operationParam = options['splittedRoute'][1];
        }

        const {modelMethodName, requestBody} = this._buildRequestBody(operationParam, options['req']);

        if (modelMethodName) {

            // Call function
            // Can be one of the following: get(), getById(), add(), update(), delete()
            model[modelMethodName](requestBody);
        } else {
            console.log('[error] ModelMethodName is not defined.');
            options['res'].send({errorMessage: 'An error occured.'});
            return;
        }
    }

    private _buildRequestBody(operationParam: any, req: any) {

        // Get by id
        if (req.method === 'GET' && operationParam === ':id') {
            return {
                modelMethodName: this._getByIdMethodName,
                requestBody: req.params.id
            };
        }

        // Get all
        if (req.method === 'GET') {
            return {
                modelMethodName: this._getMethodName,
                requestBody: null
            };
        }

        // Update
        if ((req.method === 'PUT') && operationParam === ':id') {
            req.body.id = req.params.id;

            return {
                modelMethodName: this._updateMethodName,
                requestBody: req.body
            }
        }

        // Create
        if (req.method === 'POST') {
            return {
                modelMethodName: this._addMethodName,
                requestBody: req.body
            }
        }

        return {
            modelMethodName: null,
            requestBody: null
        };
    }
}