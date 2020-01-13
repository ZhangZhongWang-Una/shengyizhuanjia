import { Component } from '@angular/core';

import { Platform, MenuController, NavController, Events, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Router } from '@angular/router';
import { USER_KEY } from './shared/services/user-service.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages: Array<{title: string, url: string, icon: string}> = [
    { title: '开店论坛', url: '\home', icon: 'chatboxes' },
    { title: '手机橱窗', url: '\home', icon: 'phone-portrait' },
    { title: '邀请有礼', url: '\home', icon: 'share' },
    { title: '资金账户', url: '\home', icon: 'logo-yen' },
    { title: '反馈建议', url: '\home', icon: 'contacts' },
    { title: '帮助中心', url: '\home', icon: 'help' },
  ];
  shopName = '';
  phone = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localStorageService: LocalStorageService,
    private menuController: MenuController,
    private navCtrl: NavController,
    private router: Router,
    public events: Events,
    private alertController: AlertController
  ) {
    this.initializeApp();
    this.backButtonEvent();
    this.events.subscribe('shop:modified', (shop) => {
      if (shop != null && shop.phone !== '' && shop.phone != null) {
        this.shopName = shop.shopName;
        this.phone = shop.phone;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    const user = this.localStorageService.get(USER_KEY, '');
    if ( user != null) {
      this.shopName = user.shopName;
      this.phone = user.accounts[0].identifier;
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.events.unsubscribe('shop:modified');
    this.menuController.enable(true);
  }

  goToSetting() {
    this.ionViewWillEnter();
    console.log('go to setting page');
    this.router.navigateByUrl('/setting');
  }

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      // console.log(this.router.url);
      if (this.router.url === '/home') {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator['app'].exitApp(); // 退出APP
        } else {
          // this.presentAlertConfirm();
          this.lastTimeBackPress = new Date().getTime(); // 再按
        }
        // navigator['app'].exitApp(); //ionic4 退出APP的方法
      }
    });
    }

    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        // header: 'Confirm!',
        message: '您要退出APP吗?',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            cssClass: 'secondary',
          handler: (blah) => {
          }
          }, {
            text: '退出',
            handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
      });
      await alert.present();
    }

}
