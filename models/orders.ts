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
        authorId: String,
        authorName: String,
        location: String,
        link: String,
        startTime: Date,
        message: String,
        orders: [
            {
               authorId: String,
               authorName: String,
               food: String,
               price: Number
            }
        ]
    };

    protected _allowMethods:Array<String> = ['get', 'getById', 'add', 'updateById'];

    protected constructor(store: any) {
        super(store);

        this._initModel();
    }

    protected _buildSchemaMethods(schema: any) {

        schema.methods.toJSON = function() {
            return {
                authorName: this.authorName,
                location: this.location,
                link: this.link,
                startTime: this.startTime,
            }
        }
    }
}


