import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    // VideoplayerComponent,
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    // VideoplayerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
