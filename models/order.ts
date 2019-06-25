export class Order {
    private _schema = {
        name: String
    };

    private _storeClient: any;
    private _orderSchema: any;
    private _orderModel: any;

    constructor(store: any) {

        this._storeClient = store.getClient()
        this._orderSchema = new this._storeClient.Schema(this._schema, { versionKey: false });

        this._orderModel = this._storeClient.model('Order', this._orderSchema);

    }

    addOrder(orderInput: any) {

        let model = new this._orderModel(orderInput);

        this._orderModel.save(function (err: any, order: any) {
            if (err){
                return console.error(err);
            }

            console.log(order.name);
        });
    }

    getOrder() {
        this._orderModel.find(function (err:any, orders:any) {
            if (err) return console.error(err);
            console.log(orders);
        })
    }
}


