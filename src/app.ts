import express from 'express';
import cors from 'cors';
import { Routes } from '@interfaces/routes.interface';
import { Request, Response } from 'express-serve-static-core';
import { generateToken } from './utils/requests';
import myCache from './utils/cache';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializePingPong();
    this.initializeData();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializePingPong() {
    this.app.get('/ping', (req: Request, res: Response) => res.send('pong'));
  }

  private initializeData() {
    const access_token = process.env.FB_ACCESS_TOKEN;
    generateToken(access_token).then(({ access_token, expires_in }: { access_token: string; expires_in: number }) => {
      myCache.set('FB_ACCESS_TOKEN', access_token, expires_in - 600);
    });
  }
}

export default App;
