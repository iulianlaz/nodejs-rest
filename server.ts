import * as bodyParser from 'body-parser';
import express from 'express';
import { routes } from './routes';
import { Store } from './store';
import {AbstractModel} from './models/abstractModel';
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);

export class Server {



    public app: express.Application;

    constructor() {
        this.app = express();

        const store = new Store();

        this._initConfig(store);

        this._preProcessRequest();

        this._buildRoutes(store).then(() => {
            // do nothing
        });

    }

    private _initConfig(store: any): void {
        // TODO

        const sessionStore = new MongoDBStore(
            {
                mongooseConnection: store.getClient().connection
            },
            function(error: any) {
                // Should have gotten an error
                console.log(error);
            });

        sessionStore.on('error', function(error: any) {
            // Also get an error here
            console.log(error);
        });


        this.app.use(session({
            // @todo: fixme secret
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true },
            store: sessionStore
        }));
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
    private async _buildRoutes(store: any): Promise<any> {

        const serverRoutes = routes.getRoutes();

        for (let route of serverRoutes) {

            // E.g. order/:id
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
        model.initOptions(
            {
                res: options['res']
            }
        );

        if ((options['splittedRoute'].length > 1)) {

            // e.g. Format: /:id
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
                modelMethodName: AbstractModel.getByIdMethodName,
                requestBody: {
                    id: req.params.id
                }
            };
        }

        // Get all
        if (req.method === 'GET') {
            return {
                modelMethodName: AbstractModel.getMethodName,
                requestBody: null
            };
        }

        // Update by id
        if ((req.method === 'PUT') && operationParam === ':id') {

            return {
                modelMethodName: AbstractModel.updateByIdMethodName,
                requestBody: {
                    id: req.params.id,
                    payload: req.body
                }
            }
        }

        // Create
        if (req.method === 'POST') {
            return {
                modelMethodName: AbstractModel.addMethodName,
                requestBody: {
                    payload: req.body
                }
            }
        }

        return {
            modelMethodName: null,
            requestBody: null
        };
    }
}