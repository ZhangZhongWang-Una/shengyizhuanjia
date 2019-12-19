import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StartAppGuard } from './core/start-app.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'welcome',
    loadChildren: './views/welcome/welcome.module#WelcomePageModule', canActivate: [StartAppGuard] },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'passport', loadChildren: './views/passport/passport.module#PassportModule' },
  { path: 'forgot-password', loadChildren: './views/forgot-password/forgot-password.module#ForgotPasswordPageModule' }
  // { path: 'login', loadChildren: './views/login/login.module#LoginPageModule' },
  // { path: 'signup', loadChildren: './views/passport/signup/signup.module#SignupPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
