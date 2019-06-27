import {AbstractModel} from './abstractModel';

export class Orders extends AbstractModel {

    /**
     * Must be overwritten
     * @type {null}
     * @private
     */
    protected _modelName = 'Order';

    /**
     * Must be overwritten
     * @type {{}}
     * @private
     */
    protected _schema: Object = {
        name: String,
        description: String
    };

    protected _allowMethods:Array<String> = ['get', 'getById', 'add'];

    protected constructor(store: any) {
        super(store);

        this._initModel();
    }
}


