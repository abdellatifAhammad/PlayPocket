import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
public displayFooter:boolean=false;
  constructor() { }

  ngOnInit(): void {
    
  }
  ngDoCheck():void{
    console.log();
    if(window.location.pathname!=="/login"&& window.location.pathname!=="/register"){
      this.displayFooter = true;
    }else{
      this.displayFooter = false;
    }
  }

}
