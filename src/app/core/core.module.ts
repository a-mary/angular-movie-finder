import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationComponent } from './navigation/navigation.component';
import {MaterialModule} from '../material/material.module';
import {AppRoutingModule} from '../app-routing.module';
import {SidenavService} from './sidenav/sidenav.service';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [ToolbarComponent, SidenavComponent, NavigationComponent, FooterComponent],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule, MaterialModule, AppRoutingModule
  ],
  providers: [SidenavService],
})
export class CoreModule { }
