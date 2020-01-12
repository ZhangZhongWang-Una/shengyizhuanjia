import { Component } from '@angular/core';

import { Platform, MenuController, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Router } from '@angular/router';
import { USER_KEY } from './shared/services/user-service.service';
import { SHOP_KEY } from './views/shop-edit/shop-edit.page';

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
    public events: Events
  ) {
    this.initializeApp();
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
    console.log(1);
    const user = this.localStorageService.get(USER_KEY, '');
    if ( user != null) {
      this.shopName = user.shopName;
      this.phone = user.accounts[0].identifier;
    }
    // const shop = this.localStorageService.get(SHOP_KEY,
    //   {
    //     shopName: '',
    //     shortName: '',
    //     phone: '',
    //     email: '',
    //     shopKeeperName: '',
    //     shopTel: ''
    //   });
    // if (shop != null && shop.phone !== '' && shop.phone != null) {
    //   this.shopName = shop.shopName;
    //   this.phone = shop.phone;
    // }
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

}
