import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public palette:any;
  public displayVideo:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  display(){
    this.displayVideo=!this.displayVideo;
  }
}
