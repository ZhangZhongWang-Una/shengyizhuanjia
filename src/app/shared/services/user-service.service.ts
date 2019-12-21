import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ISLOGIN_KEY } from 'src/app/views/welcome/welcome.page';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 注册，保存用户信息
   */
  signUp(phone: string, email: string, password: string, shopname: string): boolean {
    const account = this.localStorageService.get('user', '');
    console.log('account:' + account);
    if (account != null && (phone === account.accounts[0].identifier || email === account.accounts[1].identifier)) {
      console.log('该账号已经注册过了');
      return false;
    }
    const user = {
      shopName: shopname,
      accounts: []
    };
    user.accounts[0] = { identifier: phone, passwordToken: password};
    user.accounts[1] = { identifier: email, passwordToken: password};
    this.localStorageService.set('user', user); console.log(user);

    const time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    this.localStorageService.set('signupTime', time);
    return true;
  }

  /**
   * 验证登陆
   */
  login(account: string, password: string): boolean {
    const accounts = this.localStorageService.get('user', '').accounts;
    if (!(account === accounts[0].identifier.toString() && password === accounts[0].passwordToken.toString())
      && !(account === accounts[1].identifier.toString() && password === accounts[1].passwordToken.toString())) {
      return false; // 账号或密码错误
    }
    const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    const isLoginConfig: any = this.localStorageService.get(ISLOGIN_KEY, {
      hasLogin: true,
      time: loginTime
    });
    this.localStorageService.set(ISLOGIN_KEY, isLoginConfig);
    return true;
  }

  /**
   * 获取密码
   */
  getPassword(): string {
    return this.localStorageService.get('user', '').accounts[0].passwordToken;
  }

  /**
   * 修改密码
   */
  updatePassword(password: string): boolean {
    const tmp = this.localStorageService.get('user', '');
    tmp.accounts[0].passwordToken = password;
    tmp.accounts[1].passwordToken = password;
    this.localStorageService.set('user', tmp);
    return true;
  }

}
