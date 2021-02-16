import { Component, OnInit } from '@angular/core';
// import Vibrant from 'node-vibrant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public palette:any;
  public displayVideo:boolean=false;
  constructor() { }

  ngOnInit(): void {
    // this.getVibrantColor('http://localhost:4200/assets/img/theme/movies.png')
  }

  display(){
    this.displayVideo=!this.displayVideo;
  }

  // getVibrantColor(url: string){
  //   // Using builder
  //   Vibrant.from(url).getPalette((err, palette) => {
  //     console.log(palette)
  //     this.palette = palette;
  //   });
  // }
  
  // styleContainer(): any {
  //   console.log('palette', this.palette);
  //   if (this.palette.LightVibrant) {
  //     return { 'background-color': this.palette.LightVibrant.getHex(), 'border-color': 
  //       this.palette.LightMuted.getHex(), 'color': '#000000' };
  //   } else {
  //     return { 'background-color': '#FFFFFF', 'border-color':        
  //        this.palette.LightMuted.getHex(), 'color': '#000000' };
  //   }
  // }
  
}
