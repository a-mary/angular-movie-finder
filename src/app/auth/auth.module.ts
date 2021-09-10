import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModalComponent} from './auth-modal/auth-modal.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AuthModalComponent],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [
    AuthModalComponent
  ]
})
export class AuthModule { }
