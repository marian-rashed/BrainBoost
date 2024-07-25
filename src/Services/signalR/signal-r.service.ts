import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { environment } from '../../Enviroment/enviroment';
import { INewCommentFromSignalR } from '../../models/signalR/inew-comment-from-signal-r';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private token: any;
  constructor() {
    this.token = localStorage.getItem('token');
  }
  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/DiscussionBox`, {
        accessTokenFactory: () => this.token,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err: string) => console.log('Error while starting connection: ' + err));
  }
  public addReceiveCommentListener(
    callback: (newCommentFromSignalR:INewCommentFromSignalR) => void
  ): void {
    this.hubConnection.on('ReceiveComment', callback);
  }
}
