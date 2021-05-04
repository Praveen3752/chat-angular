declare let SockJS: any;
declare let Stomp : any;
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { ChatCompComponent } from './chat-comp/chat-comp.component';
import { ChatModel } from './ChatModel';
export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/public";
    stompClient: any;
    chatMessages : ChatModel[] = [];
    appComponent: ChatCompComponent;
    msg  = new BehaviorSubject("");
    constructor(){
       // this.appComponent = appComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            console.log("connected...");
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                console.log("message received...");
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        console.log(message.body);
        this.chatMessages.push(JSON.parse(message.body));
        console.log(this.chatMessages);
        //this.msg.next(message.body);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
    }
}