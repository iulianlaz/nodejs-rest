let mongoose = require('mongoose');

export class Store {

    private _host = 'mongodb://192.168.33.20/test';

    private _client: Object = {};

    constructor() {
        mongoose.connect(this._host, {useNewUrlParser: true, useFindAndModify: false });

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            // we're connected!
            console.log('Connected to database');
        });

        this._client = mongoose;
    }

    getClient() {
        return this._client;
    }

    getHost() {
        return this._host;
    }
}