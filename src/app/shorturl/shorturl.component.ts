import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerservService } from '../serverserv.service';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../toast.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-shorturl',
  templateUrl: './shorturl.component.html',
  styleUrls: ['./shorturl.component.css'],
})
export class ShorturlComponent implements OnInit {
  faClone = faClone;
  faChartBar = faChartBar;
  selectedUrl = null;
  urls = [];
  userData;
  isAnyUrlSelected = false;
  loader = true;
  copiedAlert = false;
  animate = false;
  sendEditValue = false;
  private updateSubscription: Subscription;
  constructor(
    private router: Router,
    public serv: ServerservService,
    private toastService: ToastService
  ) {
    this.reload();
  }
reload(){
  this.serv.getUrlsByEmail();
  this.serv.getUserData().subscribe(
    (data) => {
      this.loader = false;
      // console.log(data);
      this.userData = data;
      this.urls = data.urls;
    },
    (err) => {
      console.log(err);
      // alert(err.error.message);
      this.showDanger(err.error.message);
      this.router.navigate(['/']);
    }
  );
}
  ngOnInit(): void {
    setInterval(() => this.reload(), 300000);
  }
  displayContent(index) {
    this.selectedUrl = index;
    this.serv.updateSelectedUrl(index);
    this.isAnyUrlSelected = true;
    this.sendEditValue = true;
  }
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', item);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.copiedAlert = true;
    this.animate = true;
    setTimeout(() => {
      this.copiedAlert = false;
    }, 1600);
  }
  showStandard(msg) {
    this.toastService.show(msg);
  }

  showSuccess(msg) {
    this.toastService.show(msg, {
      classname: 'bg-success text-light',
      delay: 2000,
    });
  }

  showDanger(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 5000,
    });
  }
}
