import { Injectable } from '@angular/core';
import {ChatModel} from './ChatModel';
@Injectable({
  providedIn: 'root'
})
export class ChatService 
{
  webSocket : WebSocket;
  chatMessages : ChatModel[] = [];

  username;

  constructor() { }

  public getName()
  {
    return this.username;
  }

  public setName(name)
  {
    this.username = name;
  }

  public openWebSocket()
  {
    this.webSocket = new WebSocket("ws://calm-plateau-10664.herokuapp.com/chat");
    this.webSocket.onopen = (event) => {
      
    }
    this.webSocket.onmessage = (event) => 
    {
      //console.log(JSON.parse(event.data));
      this.chatMessages.push(JSON.parse(event.data));
    };

    this.webSocket.onclose = (event) => {
      this.closeWebSocket();
    }

  }

  public sendMessage(chatmodel : ChatModel)
  {
    console.log(JSON.stringify(chatmodel));
    this.webSocket.send(JSON.stringify(chatmodel));
  }

  public closeWebSocket()
  {
    this.webSocket.close();
  }



}
