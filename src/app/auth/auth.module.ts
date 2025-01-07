import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent} from "./login/login.component";
import { SignupComponent} from "./signup/signup.component";
import { ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginComponent,
    SignupComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
