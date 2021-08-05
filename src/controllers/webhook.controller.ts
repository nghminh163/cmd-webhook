import { Request, Response } from 'express';
import { IWebhookReceive, EWebhookReceiveObject, IWebhookReceiveEntryChangeField } from '@interfaces/routes/webhook.interface';
import WebhookAction from '@/actions/webhook.action';

class WebhookController {
  public webhookAction = new WebhookAction();

  public getVerify = (req: Request, res: Response): void => {
    const hub = req.query;
    const hubMode = hub['hub.mode'];
    const hubChallenge = hub['hub.challenge'];
    const hubVerifyToken = hub['hub.verify_token'];
    if (hubMode === 'subscribe' && hubVerifyToken === process.env.VERIFY_KEY) {
      res.status(200).send(hubChallenge);
    } else {
      res.status(401).send("You don't have permission");
    }
  };

  public receiver = (req: Request, res: Response): void => {
    const body: IWebhookReceive = req.body;
    try {
      if (body.object === EWebhookReceiveObject.APPLICATION) {
        const entries = body.entry;
        if (entries.length > 0) {
          const entry = entries[0];
          const changes = entry.changes;
          if (changes.length > 0) {
            const change = entry.changes[0];
            if (change.field === IWebhookReceiveEntryChangeField.PLUGIN_COMMENT) {
              this.webhookAction.comment(change.value, change.field);
              res.send(200);
            }
          } else {
            throw new Error('Empty data');
          }
        } else {
          throw new Error('Empty data');
        }
      } else {
        throw new Error('Invalid webhook');
      }
    } catch (e) {
      res.status(400).send('Bad request');
    }
  };
}

export default WebhookController;
