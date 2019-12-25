import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SHOP_KEY } from '../shop-edit/shop-edit.page';
import { SIGNUPTIME_KEY } from 'src/app/shared/services/user-service.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  shop: any;
  signup: any;
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.shop = this.localStorageService.get(SHOP_KEY,
      {
        shopName: '',
        shortName: '',
        phone: '',
        email: '',
        shopKeeperName: '',
        shopTel: ''
      });
    this.signup = this.localStorageService.get(SIGNUPTIME_KEY, '');
    this.localStorageService.set(SHOP_KEY, this.shop);
  }
}
