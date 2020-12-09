import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AnonymousApiDemo2WpWebPartStrings';
import AnonymousApiDemo2Wp from './components/AnonymousApiDemo2Wp';
import { IAnonymousApiDemo2WpProps } from './components/IAnonymousApiDemo2WpProps';

export interface IAnonymousApiDemo2WpWebPartProps {
  description: string;
  apiURL: string;
  userID: string;
}

export default class AnonymousApiDemo2WpWebPart extends BaseClientSideWebPart<IAnonymousApiDemo2WpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAnonymousApiDemo2WpProps> = React.createElement(
      AnonymousApiDemo2Wp,
      {
        description: this.properties.description,
        apiURL: this.properties.apiURL,
        userID: this.properties.userID,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('apiURL', {
                  label: "News API URL"
                }),
                PropertyPaneTextField('userID', {
                  label: "User ID"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
