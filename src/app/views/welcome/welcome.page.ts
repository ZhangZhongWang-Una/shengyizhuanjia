import { MenuController } from '@ionic/angular';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
export const APP_KEY = 'App';
export const ISLOGIN_KEY = 'IsLogin';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WelcomePage implements OnInit {
  showSkip = true;
  showlogin = true;
  showregister = true;
  @ViewChild('slides', {static: true}) slides: any;
  // constructor() { }
 constructor(private localStorageService: LocalStorageService,
             private router: Router,
             private menuController: MenuController) { }

  ngOnInit() {
  }
  onSlideWillChange(event) {
    // console.log(event);
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
      this.showlogin = !end;
      this.showregister = !end;
    });
  }
  // 跳过
  skip(event) {
      const signTime = this.localStorageService.get('signupTime', '');
      console.log(signTime);
      if ( signTime != null) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/signup');
      }
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  // ionViewDidLeave() {
  //   this.menuController.enable(true);
  // }
  // skip(event) {
  //   // tslint:disable-next-line: variable-name
  //   this.slides.length().then((number: any) => {
  //     this.slides.slideTo(number);
  //   });
  // }
  // ionViewWillEnter() {
  //   // 第一次调用get方法时，App'这个key不存在，第二个参数会作为默认值返回。
  //   let appConfig: any = this.localStorageService.get(APP_KEY, {
  //     hasRun: false,
  //     version: '1.0.0'
  //   });
  //   if ( appConfig.hasRun === false ) {
  //     appConfig.hasRun = true;
  //     this.localStorageService.set(APP_KEY, appConfig);
  //   } else {
  //     this.router.navigateByUrl('\home');
  //     console.log('ionViewWillEnter');
  //   }
  // }
}
