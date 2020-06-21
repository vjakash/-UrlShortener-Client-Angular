import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ServerservService } from '../serverserv.service';
import { ToastService } from '../toast.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-maindisplay',
  templateUrl: './maindisplay.component.html',
  styleUrls: ['./maindisplay.component.css'],
})
export class MaindisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  chart: any = [];
  label = [];
  chartData = [];
  loader = true;
  userData;
  totalHit = 0;
  constructor(
    private router: Router,
    public serv: ServerservService,
    private toastService: ToastService,
    private elementRef: ElementRef
  ) {
    this.serv.getUrlsByEmail();
    this.serv.getUserData().subscribe(
      (data) => {
        this.loader = false;
        // console.log(data);
        this.userData = data;
        let temp = []; //for storing data and label for charts
        this.serv.urls.forEach((item) => {
          // console.log(item);
          this.label.push(item.short_url);
          this.chartData.push(item.count);
          // temp.push([item.short_url, item.count]);
          this.totalHit += parseInt(item.count);
        });
        this.load();
      },
      (err) => {
        console.log(err);
        // alert(err.error.message);
        this.showDanger(err.error.message);
        this.router.navigate(['/']);
      }
    );
    // this.load();
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.load();
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
  load() {
    let color = '#007BFF';
    let label = [];
    let data = [];

    this.serv.urls.forEach((item) => {

      label.push(item.short_url.split("/")[item.short_url.split("/").length-1]);
      data.push(item.count);
    });

    // console.log(chartData);
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'bar',
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          // text: 'Combo Bar and line Chart'
        },
      },
      data: {
        labels: label,
        datasets: [
          {
            type: 'bar',
            label: 'No of hits',
            lineTension: 0,
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: color,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color,
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 30,
            data: data,
            backgroundColor: color,
            borderColor: color,
            fill: true,
          },
        ],
      },
    });
  }
}
