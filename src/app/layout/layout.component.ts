import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public router : Router,public chatservice : ChatService,public auth:AuthService) { }
  username;

  ngOnInit() {
  }
  showChat()
  {
    if(this.username == "" || this.username == null)
    {
      alert("Please enter the name");
      return;
    }
    this.chatservice.setName(this.username);
    this.auth.loginUser(this.username);
    this.router.navigate(['/chatscreen']);
  }

}
