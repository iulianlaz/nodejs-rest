"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.buildRoutes();
    }
    Server.prototype.initConfig = function () {
    };
    Server.prototype.buildRoutes = function () {
        this.app.get('/', function (req, res) {
            res.send('Hello World!');
        });
    };
    return Server;
}());
exports.Server = Server;
