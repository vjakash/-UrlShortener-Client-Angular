import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { VerificationComponent } from './verification/verification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ShorturlComponent } from './shorturl/shorturl.component';
import { MaindisplayComponent } from './maindisplay/maindisplay.component';
import { LoginguardGuard } from './loginguard.guard';


const routes: Routes = [{
  path:"",
  component:LoginComponent,
  canActivate:[LoginguardGuard]
},{
  path:"register",
  component:RegisterComponent
},{
  path:"forgot",
  component:ForgotComponent
},{
  path:"resetpassword/:token/:email",
  component:ResetpassComponent
},{
  path:"verifyaccount/:token/:email",
  component:VerificationComponent,
},{
  path:"dashboard",
  component:DashboardComponent,
  canActivate:[AuthGuard],
  children:[{
    path:'',
    component:MaindisplayComponent
  },{
    path:'shorturl',
    component:ShorturlComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
