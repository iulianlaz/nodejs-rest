import {Server} from './server';

const port = 3000;
const server = new Server().app;

server.listen(port, (err: string) => {
    if (err) {
        return console.log(err);
    }

    return console.log(`server is listening on ${port}`);
});