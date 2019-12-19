import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zzw-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent {
  @Input() bottom: string;
  text: string;
  constructor() {
    const year = (new Date()).getFullYear();
    this.text = `2010-${year} 生意专家`;
    this.bottom = '10px';
  }
}

// @Component({
//   selector: 'zzw-copyright',
//   templateUrl: './copyright.component.html',
//   styleUrls: ['./copyright.component.scss'],
// })
// export class CopyrightComponent {

//   @Input() bottom: string;
//   text: string;
//   constructor() {
//     const year = (new Date()).getFullYear();
//     this.text = `2010-${year} 生意专家`;
//     this.bottom = '10px';
//   }

// }
