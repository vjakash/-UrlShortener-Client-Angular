import { Component, OnInit } from '@angular/core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {ServerservService} from '../serverserv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faPowerOff=faPowerOff;
  constructor(private router:Router,private serv:ServerservService) {
    this.serv.getUserData().subscribe((data)=>{
      console.log(data);
    },(err)=>{
      console.log(err);
    })
   }

  ngOnInit(): void {
  }
  signout(){
    this.serv.deleteToken();
    this.serv.removeCurrentEmail();
    this.router.navigate(['/']);
    alert("signed out");
  }
}
