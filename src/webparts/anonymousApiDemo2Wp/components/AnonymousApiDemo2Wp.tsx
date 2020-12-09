import * as React from 'react';
import styles from './AnonymousApiDemo2Wp.module.scss';
import { IAnonymousApiDemo2WpProps } from './IAnonymousApiDemo2WpProps';
import { IAnonymousApiDemo2WpState } from './IAnonymousApiDemo2WpState';
import { escape } from '@microsoft/sp-lodash-subset';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IAnonymousApiDemo2WpWebPartProps } from '../AnonymousApiDemo2WpWebPart';

export default class AnonymousApiDemo2Wp extends React.Component<IAnonymousApiDemo2WpProps, IAnonymousApiDemo2WpState> {

  public constructor(props: IAnonymousApiDemo2WpProps, state: IAnonymousApiDemo2WpState) {
    super(props);

    this.state = {
      id: null,
      name: null,
      username: null,
      email: null
    }
  }

  public getUserDetails(): Promise<any> {

    let url = this.props.apiURL + "/" + this.props.userID;

    return this.props.context.httpClient.get(
      url, HttpClient.configurations.v1
    )
    .then((response: HttpClientResponse) => {
      return response.json();
    })
    .then(jsonResponse => {
      return jsonResponse;
    }) as Promise<any>;

  }

  public InvokeAPIAndSetDataIntoState() {
    this.getUserDetails().then(response => {
      this.setState({
        id: response.id,
        name: response.name,
        username: response.username,
        email: response.email
      });
    });
  }

  public componentDidMount() {
    this.InvokeAPIAndSetDataIntoState();
  }

  public componentDidUpdate(prevProps: IAnonymousApiDemo2WpWebPartProps, prevState: IAnonymousApiDemo2WpState, prevContext: any) {
    this.InvokeAPIAndSetDataIntoState();
  }

  public render(): React.ReactElement<IAnonymousApiDemo2WpProps> {
    return (
      <div className={ styles.anonymousApiDemo2Wp }>
        <span className={ styles.title }>User Details:</span>

        <div><strong>ID: </strong>{this.state.id}</div><br />
        <div><strong>Name: </strong>{this.state.name}</div><br />
        <div><strong>User Name: </strong>{this.state.username}</div><br />
        <div><strong>Email: </strong>{this.state.email}</div><br />

      </div>
    );
  }
}
