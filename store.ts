let mongoose = require('mongoose');

export class Store {

    private _client: Object = {};

    constructor() {
        mongoose.connect('mongodb://192.168.33.20/test', {useNewUrlParser: true});

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            // we're connected!
            console.log('connected');
        });

        this._client = mongoose;
    }

    getClient() {
        return this._client;
    }
}