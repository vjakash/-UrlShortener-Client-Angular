import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServerservService } from '../serverserv.service';
import { Router } from '@angular/router';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modaledit',
  templateUrl: './modaledit.component.html',
  styleUrls: ['./modaledit.component.css'],
})
export class ModaleditComponent implements OnInit {
  faPencilAlt=faPencilAlt;
  @Input('selectedUrl') selectedUrl;
  closeResult = '';
  urlDetails;
  shortUrl ='';
  shortUrlEnd = '';
  finished=false;
  loader = false;
  success=-1;
  message="It's not mandatory to customize URL";

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private serv: ServerservService,
    private router: Router
  ) {
    // console.log(this.serv.selectedUrl);
    this.shortUrl=this.serv.selectedUrl;
    this.shortUrlEnd=this.serv.selectedUrl.split("/")[this.serv.selectedUrl.split("/").length-1];
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
  update() {
    this.serv.getUrlsByEmail();
    this.shortUrl = '';
    this.shortUrlEnd = '';
  }
  createCustomUrl() {
    this.loader = true;
    console.log(this.shortUrl, this.shortUrlEnd);
    this.serv.createCustomUrl(this.shortUrl, this.shortUrlEnd).subscribe(
      (data) => {
        this.loader = false;
        console.log(data);
        // alert(data['message']);
        this.message=data["message"];
        this.serv.getUrlsByEmail();
        this.finished=true;
        this.success=1;

      },
      (err) => {
        this.success=0;
        this.loader = false;
        console.log(err);
        this.message=err.error["message"];
        // alert(err.error.message+" try any other url");
      }
    );
  }

}
