import { Component, HostListener, OnInit } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public palette:any;
  public displayVideo:boolean=false;
  public innerWidth: any;
  public error:boolean=false;
  public thumb:any;
  public downloadURL: Observable<string>;
  public fb; 
  public loading:boolean=false;
  public success:boolean=false;
  public userLinks:Array<any>=[];
  public youtubePlayer:boolean=false;
  public okPlayer:boolean=false;
  public localPlayer:boolean=true;
  public currentVideo:any;

  constructor(private linksService:LinksService,private authService:AuthService,private storage: AngularFireStorage,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getLinks();
    if(window.innerWidth<700){
      this.innerWidth = window.innerWidth-170;
    }else if(window.innerWidth<560){
      this.innerWidth = window.innerWidth-190;
    }else{
      this.innerWidth = window.innerWidth -370;
    }
    
    // this.currentVideo.link =""
     
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth-300;
    console.log(this.innerWidth);
    
    if(window.innerWidth<700){
      this.innerWidth = window.innerWidth-170;
    }else if(window.innerWidth<560){
      this.innerWidth = window.innerWidth-190;
    }else{
      this.innerWidth = window.innerWidth -370;
    }
  }
  display(){
    this.displayVideo=!this.displayVideo;
  }
  async getLinks(){
    var list =[]
      console.log(JSON.parse(localStorage.getItem('user')).email);
      await this.linksService.getLikns(JSON.parse(localStorage.getItem('user')).email).then(res=>{
        res.docs.forEach(ele=>{
          list.push({id:ele.id,data:ele.data()})
        })
      }).then(result=>{
        this.userLinks = list;
        console.log(list);
        
      })
  }
  createLink(title :String ,link:String,type:String){
    this.loading = true;
    if(title&&link){
      
      var n = Date.now();
      const filePath = `thumb/${n}`;
      let data={
        link:link,
        title:title,
        type:type,
        userEmail:this.authService.CurrentUser().email,
      }
      let img = {
        file:this.thumb,
        filePath:filePath,
      }
          const fileRef = this.storage.ref(img.filePath);
          const task = this.storage.upload(img.filePath, img.file)
           task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(url => {
                if (url) {
                  this.fb = url;
                }
                 this.linksService.createNewLink({...data,thumb:this.fb}).then(res=>{
                  this.getLinks();
                  this.success=true;
                   this.loading=false;
                 })
              });
            })
          ).subscribe()
      // console.log(data);
    }else{
      this.error=true;
      console.log("not complete to do this action");
      this.loading=false;
      
    }
    // this.linksService.createNewLink(data)
  }

  // track(data){
  //   console.log(data);
  // }
  onFileSelected(event) {
    var n = Date.now();
    this.thumb = event.target.files[0];
    const filePath = `thumb/${n}`;
   console.log(this.thumb);
  }

  changePlayer(video){
    console.log("https://www.youtube.com/embed/"+video.data.link.split('?v=')[1]);
    
    if(video.data.type==="ok"){
      this.currentVideo={link:"//ok.ru/videoembed/"+video.data.link.split('video/')[1],...video};
      this.displayVideo=true;
      this.youtubePlayer=false;
      this.localPlayer=false;
      this.okPlayer=true;
    }else if(video.data.type==="youtube"){
      this.currentVideo={link:"https://www.youtube.com/embed/"+video.data.link.split('?v=')[1],...video};
      this.displayVideo=true;
      this.localPlayer=false;
      this.okPlayer=false;
      this.youtubePlayer=true;
    }else{
      this.localPlayer=true;
      this.okPlayer=false;
      this.youtubePlayer=false;
      this.displayVideo=true;
    }
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
   

}
