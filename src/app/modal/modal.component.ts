import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServerservService } from '../serverserv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  closeResult = '';
  urlDetails;
  changeModel = false;
  loader = false;
  shortUrl = '';
  shortUrlEnd = '';
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private serv: ServerservService,
    private router: Router
  ) {
    this.urlDetails = this.fb.group({
      url: this.fb.control('', [Validators.required]),
      // lastName: this.fb.control('', [Validators.required]),
      // email: this.fb.control('', [Validators.required, Validators.email]),
      // password: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log(this.closeResult);
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log(this.closeResult);
      return 'by clicking on a backdrop';
    } else {
      console.log(this.closeResult);
      return `with: ${reason}`;
    }
  }
  createUrl() {
    this.loader = true;
    console.log('createUrl');
    this.serv.createShortUrl(this.urlDetails.value).subscribe(
      (data) => {
        this.loader = false;
        console.log(data);
        this.shortUrl = data['short_url'];
        this.shortUrlEnd = data['short_url'].split('/')[
          data['short_url'].split('/').length - 1
        ];
        console.log(this.shortUrl,this.shortUrlEnd);
        this.changeModel = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  createCustomUrl(){
    this.loader = true;
    console.log(this.shortUrl,this.shortUrlEnd)
    this.serv.createCustomUrl(this.shortUrl,this.shortUrlEnd).subscribe((data)=>{
      this.loader = false;
      console.log(data);
      alert(data['message']);
    },(err)=>{
      console.log(err);
    })
  }
}
