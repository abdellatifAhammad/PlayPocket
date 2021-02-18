import { Component, HostListener, OnInit } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public palette:any;
  public displayVideo:boolean=false;
  public innerWidth: any;

  constructor(private linksService:LinksService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }
  display(){
    this.displayVideo=!this.displayVideo;
  }

  createLink(){
    let data={
      test:"holla abdo"
    }
    this.linksService.createNewLink(data)
  }

}
