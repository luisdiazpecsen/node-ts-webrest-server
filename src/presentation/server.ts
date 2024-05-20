import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    publicPath?: string;
};

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, publicPath = 'public', routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {

        /**
         * Middlewares
         */
        this.app.use(express.json()); // json
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
        this.app.use(compression());

        /**
         * Public folder
         */
        this.app.use(express.static(this.publicPath));

        /**
         * WebServer routes
         */
        this.app.use(this.routes);

        /**
         * SPA
         */
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}