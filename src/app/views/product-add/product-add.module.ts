import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductAddPage } from './product-add.page';
import { SupplySelectPage } from '../supply-select/supply-select.page';

const routes: Routes = [
  {
    path: '',
    component: ProductAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductAddPage,
    SupplySelectPage],
  entryComponents: [
    SupplySelectPage
  ]
})
export class ProductAddPageModule {}
