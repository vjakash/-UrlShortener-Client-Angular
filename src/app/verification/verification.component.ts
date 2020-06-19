import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerservService } from '../serverserv.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  displayData;
  email;
  loader=true;
  constructor(
    private router: Router,
    private serv: ServerservService,
    private activatedRoute: ActivatedRoute
  ) {
    let token=this.activatedRoute.snapshot.params.token;
    this.email=this.activatedRoute.snapshot.params.email;
    this.serv.verifyAccount(token,this.email).subscribe((data)=>{
      this.loader=false;
      this.displayData=data;
    },(err)=>{
      console.log(err);
    })
  }

  ngOnInit(): void {}
}
