import { Md5 } from 'ts-md5/dist/md5';
import { Register } from '../model/register';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ISLOGIN_KEY } from 'src/app/views/welcome/welcome.page';
import { SHOP_KEY } from 'src/app/views/shop-edit/shop-edit.page';
export const USER_KEY = 'User';
export const SIGNUPTIME_KEY = 'SignupTime';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 注册，保存用户信息
   */
  signUp(register: Register): boolean {
    const account = this.localStorageService.get(USER_KEY, '');
    console.log('account:' + account);
    if (account != null && (register.phone === account.accounts[0].identifier || register.email === account.accounts[1].identifier)) {
      console.log('该账号已经注册过了');
      return false;
    }
    const user = {
      shopName: register.shopName,
      accounts: []
    };
    const md5Password = Md5.hashStr(register.password).toString();
    user.accounts[0] = { identifier: register.phone, passwordToken: md5Password};
    user.accounts[1] = { identifier: register.email, passwordToken: md5Password};
    this.localStorageService.set(USER_KEY, user); console.log(user);

    const time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    const shop = {
      shopName: register.shopName,
      shortName: '',
      phone: register.phone,
      email: register.email,
      shopKeeperName: '',
      shopTel: ''
    };
    this.localStorageService.set(SHOP_KEY, shop);
    this.localStorageService.set(SIGNUPTIME_KEY, time);
    return true;
  }

  /**
   * 验证登陆
   */
  login(account: string, password: string): boolean {
    const accounts = this.localStorageService.get(USER_KEY, '').accounts;
    if (!(account === accounts[0].identifier.toString() && password === accounts[0].passwordToken.toString())
      && !(account === accounts[1].identifier.toString() && password === accounts[1].passwordToken.toString())) {
      return false; // 账号或密码错误
    }
    const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    const isLoginConfig = {
      hasLogin: true,
      time: loginTime
    };
    this.localStorageService.set(ISLOGIN_KEY, isLoginConfig);
    return true;
  }

  /**
   * 获取密码
   */
  getPassword(): string {
    return this.localStorageService.get(USER_KEY, '').accounts[0].passwordToken;
  }

  /**
   * 修改密码
   */
  updatePassword(password: string): boolean {
    const tmp = this.localStorageService.get(USER_KEY, '');
    tmp.accounts[0].passwordToken = password;
    tmp.accounts[1].passwordToken = password;
    this.localStorageService.set(USER_KEY, tmp);
    return true;
  }
}
