import { CopyrightComponent } from './components/copyright/copyright.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from './services/local-storage.service';



@NgModule({
  declarations: [CopyrightComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    LocalStorageService
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopyrightComponent
  ]

})
export class SharedModule { }
