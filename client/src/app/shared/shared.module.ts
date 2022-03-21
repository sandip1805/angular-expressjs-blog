import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';

@NgModule({
  declarations: [
    GlobalHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    GlobalHeaderComponent
  ],
  providers: [
  ],
})
export class SharedModule { }
