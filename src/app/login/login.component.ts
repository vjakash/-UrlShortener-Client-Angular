import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ServerservService} from '../serverserv.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails;
  loader=false;
  valid=false;
  constructor(private fb:FormBuilder,private router:Router,private serv:ServerservService) { 
    this.loginDetails=this.fb.group({
      email:this.fb.control("",[Validators.required,Validators.email]),
      password:this.fb.control("",[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  login(){
    let count=1;
    if(this.loginDetails.valid){
      this.loader=true;
      this.loginDetails.value.password=btoa(this.loginDetails.value.password);
      this.serv.login(this.loginDetails.value).subscribe(
        data=>{
        this.loader=false;
        this.router.navigate(['/dashboard']);
        this.serv.updateToken(data['token']);
        this.serv.updateCurrentEmail(data['email']);
        alert(data.message);
        // console.log(data);
      },
        error=>{
          this.loader=false;
         alert(error.error.message);
      }
      );
    }else{
      this.valid=true;
    }
  }
}
