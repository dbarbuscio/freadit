import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginCompenent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginCompenent},
  {path: 'signup', component: SignupComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class AuthRoutingModule {}
