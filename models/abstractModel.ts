export class AbstractModel {

    static getMethodName:string = 'get';
    static getByIdMethodName:string = 'getById';
    static addMethodName:string = 'add';
    static updateMethodName:string = 'update';

    /**
     * Must be overwritten
     * @type {null}
     * @private
     */
    protected _modelName: string = '';

    /**
     * Must be overwritten
     * @type {{}}
     * @private
     */
    protected _schema: Object = {};

    protected _allowMethods:Array<String> = [];

    protected _storeClient: any;
    protected _model: any;
    protected _options: any;

    protected static _instance: any = null;

    protected constructor(store: any) {
        this._storeClient = store.getClient();
    }

    // TODO: it works for a single store for now
    static getInstance(store: any) {
        if (!this._instance) {
            this._instance = new this(store);
        }

        return this._instance;
    }

    protected _initModel() {
        const schema = new this._storeClient.Schema(this._schema, { versionKey: false });
        this._model = this._storeClient.model(this._modelName, schema);
    }

    public initOptions(options: any) {

        this._options = options;
    }

    public get() {

        if (this._allowMethods.indexOf(AbstractModel.getMethodName) === -1) {
            this._options['res'].send({errorMessage: 'Method not allowed.'});

            return;
        }

        this._model.find((err:any, entities:any) => {
            if (err) {
                this._options['res'].end();
                return console.error(err);
            }

            this._options['res'].send(entities)
        })
    }

    public getById(entityId: string) {

        if (this._allowMethods.indexOf(AbstractModel.getByIdMethodName) === -1) {
            this._options['res'].send({errorMessage: 'Method not allowed.'});

            return;
        }

        this._model.findById(entityId, (err:any, entity:any) => {
            if (err) {
                this._options['res'].end();
                return console.error(err);
            }

            this._options['res'].send(entity)
        })
    }

    public add(entityInput: any) {

        if (this._allowMethods.indexOf(AbstractModel.addMethodName) === -1) {
            this._options['res'].send({errorMessage: 'Method not allowed.'});

            return;
        }

        let model = new this._model(entityInput);

        model.save((err: any, entity: any) => {
            if (err){
                this._options['res'].end();
                return console.error(err);
            }

            this._options['res'].send(entity)
        });
    }

}


