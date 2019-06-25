
class Routes {

    /**
     * Route paths
     * e.g. orders/add
     *
     * @private
     */
    private _routes = [
        'order/get',
        'order/add'
    ];

    constructor() {
    }

    public getRoutes(): Array<String> {
        return this._routes;
    }

}

const routes = new Routes();

export {routes};