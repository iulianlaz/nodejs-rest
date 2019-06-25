"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var port = 3000;
var server = new server_1.Server().app;
server.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("server is listening on " + port);
});
