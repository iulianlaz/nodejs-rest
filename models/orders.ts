export class Orders {
    private _schema = {
        name: String
    };

    private _storeClient: any;
    private _orderModel: any;
    private _options: any;

    private static _instance: any = null;

    private constructor(store: any) {

        this._storeClient = store.getClient();

        const orderSchema = new this._storeClient.Schema(this._schema, { versionKey: false });
        this._orderModel = this._storeClient.model('Order',orderSchema);
    }

    static getInstance(store: any) {
        if (!this._instance) {
            this._instance = new Orders(store);
        }

        return this._instance;
    }

    public get() {

        this._orderModel.find((err:any, orders:any) => {
            if (err) {
                this._options['res'].end();
                return console.error(err);
            }

            this._options['res'].send(orders)
        })
    }

    public getById(orderId: string) {

        this._orderModel.findById(orderId, (err:any, order:any) => {
            if (err) {
                this._options['res'].end();
                return console.error(err);
            }

            this._options['res'].send(order)
        })
    }

    public add(orderInput: any) {

        let model = new this._orderModel(orderInput);

        model.save((err: any, order: any) => {
            if (err){
                this._options['res'].end();
                return console.error(err);
            }

            this._options['res'].send(order)
        });
    }

    public setOptions(options: Object) {
        this._options = options;
    }
}


