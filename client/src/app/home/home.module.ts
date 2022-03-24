import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class HomeModule {}
