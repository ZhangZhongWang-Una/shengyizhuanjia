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
  { path: 'forgot-password', loadChildren: './views/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'setting', loadChildren: './views/setting/setting.module#SettingPageModule' },
  { path: 'about-us', loadChildren: './views/about-us/about-us.module#AboutUsPageModule' },
  { path: 'change-password', loadChildren: './views/change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'shop', loadChildren: './views/shop/shop.module#ShopPageModule' },
  { path: 'shop-edit', loadChildren: './views/shop-edit/shop-edit.module#ShopEditPageModule' },
  { path: 'category-list', loadChildren: './views/category-list/category-list.module#CategoryListPageModule' },
  { path: 'category-add', loadChildren: './views/category-add/category-add.module#CategoryAddPageModule' },  { path: 'category-edit', loadChildren: './views/category-edit/category-edit.module#CategoryEditPageModule' },
  { path: 'category-edit-name', loadChildren: './views/category-edit-name/category-edit-name.module#CategoryEditNamePageModule' },
  { path: 'product-add', loadChildren: './views/product-add/product-add.module#ProductAddPageModule' },
  { path: 'supply-select', loadChildren: './views/supply-select/supply-select.module#SupplySelectPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
