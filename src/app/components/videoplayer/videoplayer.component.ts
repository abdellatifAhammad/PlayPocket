import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
  public palette:any;
  public displayVideo:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  display(){
    this.displayVideo=!this.displayVideo;
  }

}
