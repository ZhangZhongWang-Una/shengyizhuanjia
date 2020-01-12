import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ToastController, Events } from '@ionic/angular';
import { USER_KEY } from 'src/app/shared/services/user-service.service';
export const SHOP_KEY = 'Shop';
@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {
  title: string;
  property: string;
  value: any; // 用于ngModel，从shop对象的相关属性中获取数据
  shop: any; // 用于保存从本地存储中获得店铺数据
  constructor(private activatedRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private toastCtrl: ToastController,
              private router: Router,
              public events: Events) {

                activatedRoute.queryParams.subscribe(queryParams => {
                this.property = queryParams.property;
                this.title = queryParams.title;
              });
              }

  ngOnInit() {
  }

  /**
   * 保存用户修改
   */
  async onSave() {
    this.shop = this.localStorageService.get(SHOP_KEY,
      {
        shopName: '',
        shortName: '',
        phone: '',
        email: '',
        shopKeeperName: '',
        shopTel: ''
      });
    this.shop[this.property] = this.value;
    this.localStorageService.set(SHOP_KEY, this.shop);
    const user = this.localStorageService.get(USER_KEY, '');
    if ( user != null) {
      user.shopName = this.shop.shopName;
      user.accounts = user.accounts;
    }
    this.localStorageService.set(USER_KEY, user);
    this.events.publish('shop:modified', this.shop);
    this.value = '';
    const toast = await this.toastCtrl.create({
      message: '保存成功',
      duration: 3000
    });
    toast.present();

    this.router.navigateByUrl('/shop');
  }
}
