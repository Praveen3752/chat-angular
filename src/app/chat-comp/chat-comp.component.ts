import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../chat.service';
import {ChatModel} from '../ChatModel';
import { WebSocketAPI } from '../WebSocketAPI';
declare var $ : any;
@Component({
  selector: 'app-chat-comp',
  templateUrl: './chat-comp.component.html',
  styleUrls: ['./chat-comp.component.css']
})
export class ChatCompComponent implements OnInit,OnDestroy {

  webSocketAPI: WebSocketAPI;
  constructor(public chatservice : ChatService) { }

  ngOnInit()
  {
    this.webSocketAPI = new WebSocketAPI();
	//this.fun();
	this.connect();
    var that = this;
    $("#msgdata").emojioneArea(
      {
        events: {
          keyup: function (editor, event) 
          {
            if(event.which == 13)
              {  
                that.sendMessage();
              }
            
          }
      }
      }
      );
   // this.chatservice.openWebSocket();
  }

  connect(){
    this.webSocketAPI._connect();
  }

  ngOnDestroy(){
    //this.chatservice.closeWebSocket();
  }

  sendMessage()
  {
    
    const chatmessagedata = new ChatModel(this.chatservice.username,$('#msgdata').data("emojioneArea").getText().trim());
    //this.chatservice.sendMessage(chatmessagedata);
    console.log(chatmessagedata);
    this.webSocketAPI._send(chatmessagedata);
    $('#msgdata').data("emojioneArea").setText('')
    //sendForm.controls.usermsg.reset();
  }

}
