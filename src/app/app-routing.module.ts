import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardServiceService } from './auth-guard-service.service';
import { ChatCompComponent } from './chat-comp/chat-comp.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {path : "chatscreen" ,
  canActivate:[AuthGuardServiceService],
  component : ChatCompComponent},
  {path : "",component:LayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
