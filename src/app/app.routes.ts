import {RouterModule, Routes} from '@angular/router';
import { LoginComponent} from "./auth/login/login.component";
import { SignupComponent} from "./auth/signup/signup.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
