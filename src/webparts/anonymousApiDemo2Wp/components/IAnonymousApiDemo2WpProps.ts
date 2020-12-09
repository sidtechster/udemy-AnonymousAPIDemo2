import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IAnonymousApiDemo2WpProps {
  description: string;
  apiURL: string;
  userID: string;
  context: WebPartContext;
}
