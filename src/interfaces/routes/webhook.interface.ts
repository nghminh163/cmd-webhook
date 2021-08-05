export interface IWebhookReceive {
  object: EWebhookReceiveObject;
  entry: IWebhookReceiveEntry[];
}

export enum EWebhookReceiveObject {
  APPLICATION = 'application',
}

interface IWebhookReceiveEntry {
  id: string;
  time: string;
  changes: IWebhookReceiveEntryChange[];
}

interface IWebhookReceiveEntryChange {
  field: IWebhookReceiveEntryChangeField;
  value: IWebhookReceiveEntryChangeValue;
}

export enum IWebhookReceiveEntryChangeField {
  PLUGIN_COMMENT = 'plugin_comment',
}

export interface IWebhookReceiveEntryChangeValue {
  created_time: string;
  message: string;
  from: {
    name: string;
    id: string;
  };
  id: string;
}
