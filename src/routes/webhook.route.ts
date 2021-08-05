import { Router } from 'express';
import WebhookController from '@controllers/webhook.controller';
import { Routes } from '@interfaces/routes.interface';

class WebhookRoute implements Routes {
  public path = '/webhook';
  public router = Router();
  public webhookController = new WebhookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.webhookController.getVerify);
    this.router.post(`${this.path}`, this.webhookController.receiver);
  }
}

export default WebhookRoute;
