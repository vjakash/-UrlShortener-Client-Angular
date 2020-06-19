import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerservService } from '../serverserv.service';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shorturl',
  templateUrl: './shorturl.component.html',
  styleUrls: ['./shorturl.component.css'],
})
export class ShorturlComponent implements OnInit {
  faClone = faClone;
  faChartBar=faChartBar;
  selectedUrl = null;
  urls = [];
  userData;
  isAnyUrlSelected = false;
  loader = true;
  copiedAlert = false;
  animate = false;
  constructor(private router: Router, private serv: ServerservService) {
    this.serv.getUserData().subscribe(
      (data) => {
        this.loader = false;
        console.log(data);
        this.userData = data;
        this.urls = data.urls;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
  displayContent(index) {
    this.selectedUrl = this.urls[index];
    this.isAnyUrlSelected = true;
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
}
