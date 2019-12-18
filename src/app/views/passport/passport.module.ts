import { NgModule } from '@angular/core';
import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'signup',
    component: SignupPage
  }
];
@NgModule({
  declarations: [
    LoginPage,
    SignupPage
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PassportModule { }
