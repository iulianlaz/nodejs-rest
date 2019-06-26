
class Routes {

    /**
     * Route paths
     * e.g. orders/add
     *
     * @private
     */
    private _routes = [

        /* The order matters! If first matches, then stop processing request */
        'orders/:id',
        'orders'
    ];

    constructor() {
    }

    public getRoutes(): Array<String> {
        return this._routes;
    }

}

const routes = new Routes();

export {routes};