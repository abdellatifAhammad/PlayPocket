import { Component, HostListener, OnInit } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';


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

  constructor(private linksService:LinksService,private authService:AuthService,private storage: AngularFireStorage) { }

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
   

}
