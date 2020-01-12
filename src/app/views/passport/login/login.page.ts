import { ISLOGIN_KEY } from './../../welcome/welcome.page';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NavController, ToastController, AlertController, MenuController, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService, USER_KEY } from 'src/app/shared/services/user-service.service';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { SHOP_KEY } from '../../shop-edit/shop-edit.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnInit {

  username = '';
  password = '';

  constructor(private localStorageService: LocalStorageService,
              private navCtrl: NavController,
              private router: Router,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private userService: UserServiceService,
              private menuController: MenuController,
              public events: Events) { }

  ngOnInit() {
  }

  async onLogin(form: NgForm) {
    // 账号为空时提示输入账号
    if (this.username === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的手机号码或者邮箱',
        duration: 3000
      });
      toast.present();
    } else if (this.password === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的密码',
        duration: 3000
      });
      toast.present();
    } else {
      // 密码不对时提示错误
      const accounts = this.localStorageService.get(USER_KEY, '').accounts;
      const md5Password = Md5.hashStr(this.password).toString();
      if (!this.userService.login(this.username, md5Password)) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '用户名或者密码不正确',
          buttons: ['确定']
        });
        alert.present();
      } else {
        this.menuController.enable(true);
        this.username = '';
        this.password = '';
        const shop = this.localStorageService.get(SHOP_KEY,
          {
            shopName: '',
            shortName: '',
            phone: '',
            email: '',
            shopKeeperName: '',
            shopTel: ''
          });
        this.events.publish('shop:modified', shop);
        this.router.navigateByUrl('/home');
      }
    }
  }
  openSignup() {
    this.router.navigateByUrl('/signup');
  }
  openForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
    this.username = this.localStorageService.get(USER_KEY, '').accounts[0].identifier;

  }
}
