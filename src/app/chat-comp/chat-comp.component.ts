import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../chat.service';
import {ChatModel} from '../ChatModel';
declare var $ : any;
@Component({
  selector: 'app-chat-comp',
  templateUrl: './chat-comp.component.html',
  styleUrls: ['./chat-comp.component.css']
})
export class ChatCompComponent implements OnInit,OnDestroy {

  constructor(public chatservice : ChatService) { }

  ngOnInit()
  {
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
    this.chatservice.openWebSocket();
  }

  ngOnDestroy(){
    this.chatservice.closeWebSocket();
  }

  sendMessage()
  {
    
    const chatmessagedata = new ChatModel(this.chatservice.username,$('#msgdata').data("emojioneArea").getText().trim());
    this.chatservice.sendMessage(chatmessagedata);
    $('#msgdata').data("emojioneArea").setText('')
    //sendForm.controls.usermsg.reset();
  }

}
