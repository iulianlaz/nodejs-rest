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
        authorName: {
            type: String,
            maxlength: 64,
            required: true
        },
        location: {
            type: String,
            maxlength: 1024,
            required: true
        },
        link: {
            type: String,
            maxlength: 1024,
            required: true
        },
        startTime: Date,
        message: {
            type: String,
            maxlength: 1024
        },
        orders: [
            {
                authorId: String,
                authorName: {
                    type: String,
                    maxlength: 1024,
                    unique: true,
                    required: true
                },
                food: {
                    type: String,
                    maxlength: 1024,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    };

    protected _allowMethods: Array<String> = ['get', 'getById', 'add', 'updateById'];

    protected constructor(store: any) {
        super(store);

        this._initModel();
    }

    protected _processQuery(query: any = {}) {
        const databaseQuery: any = {};

        if (query.hasOwnProperty('startTime')) {

            const currentDate = new Date(); // Today

            switch (query['startTime']) {
                case 'today':

                    currentDate.setDate(currentDate.getDate() - 1); // Yesterday
                    databaseQuery['startTime'] = {$gte: currentDate};
                    break;

                case 'past':

                    currentDate.setDate(currentDate.getDate() - 1); // Yesterday
                    databaseQuery['startTime'] = {$lt: currentDate};
                    break;

                default:
                    break;
            }

        }

        return databaseQuery;
    }

    protected _buildSchemaMethods(schema: any) {

        schema.methods.toJSON = function() {
            return {
                orderId: this.id,
                authorName: this.authorName,
                location: this.location,
                link: this.link,
                startTime: this.startTime,
                orders: this.orders
            };
        };
    }
}


