import { AuthenticationCodeService } from 'src/app/shared/services/authentication-code.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AlertController, NavController, ToastController, MenuController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserServiceService, USER_KEY } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private localStorage: LocalStorageService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private router: Router,
              private menuController: MenuController,
              private authenticationCode: AuthenticationCodeService,
              private userService: UserServiceService) { }

  account = '';
  slideIndex: any = 0;
  phone = '';
  password = '';
  confirmPassword = '';
  @ViewChild('forgotPasswordSlides', {static: true}) forgotPasswordSlides: IonSlides;
  // 验证码
  verifyCode: any = {
    verifyCodeTips: '获取验证码',
    code : '',
    codeLength: 4,
    countdown: 60,
    disable: true,
    fail: false// 验证失败
};
// 验证密码是否相同
params: any = {
  checkInformationResult: false
};

  ngOnInit() {
    // this.forgotPasswordSlides.lockSwipes(false);
    // this.forgotPasswordSlides.slideTo(3);
    this.forgotPasswordSlides.lockSwipes(true);
  }
  next() {
    this.forgotPasswordSlides.lockSwipes(false);
    this.forgotPasswordSlides.slideNext();
    this.slideIndex++;
    this.forgotPasswordSlides.lockSwipes(true);
  }
  previous() {
    this.forgotPasswordSlides.lockSwipes(false);
    this.forgotPasswordSlides.slidePrev();
    this.slideIndex--;
    this.forgotPasswordSlides.lockSwipes(true);
  }
  async checkAccount() {
    const user = this.localStorage.get(USER_KEY, '');
    if (this.account === '') {
      const toast = await this.toastCtrl.create({
      message: '请输入您的邮箱或者手机号码',
      duration: 3000
    });
      toast.present();
    } else if (this.account !== user.accounts[0].identifier.toString() && this.account !== user.accounts[1].identifier.toString()) {
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '请输入正确的邮箱或者手机号码',
        buttons: ['知道了']
      });
      alert.present();
    } else {
      this.phone = user.accounts[0].identifier.toString();
      this.next();
    }
  }
  /**
   * 倒计时
   */
    settime() {
      if (this.verifyCode.countdown === 1) {
          this.verifyCode.countdown = 60;
          this.verifyCode.verifyCodeTips = '重新获取';
          this.verifyCode.disable = true;
          return;
      } else {
          this.verifyCode.countdown--;
      }

      this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
      setTimeout(() => {
          this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
          this.settime();
      }, 1000);
  }
  /**
   * 获取短信验证码
   */
  async getCode() {
      this.authenticationCode.sendSms(this.phone, this.verifyCode.codeLength);
      // 发送验证码成功后开始倒计时
      this.verifyCode.disable = false;
      this.settime();
  }
  /**
   * 检验验证码
   */
  async checkCode() {
      console.log(this.verifyCode);
      if (this.verifyCode.code == null || this.verifyCode.code === '') {
        const toast = await this.toastCtrl.create({
          message: '输入不能为空',
          duration: 3000
        });
        toast.present();
      } else {
        if (this.authenticationCode.validate(this.verifyCode.code.toString())) {
          this.next();
          this.verifyCode.fail = false;
      } else {
          this.verifyCode.fail = true;
      }
      }
  }
  /**
   * 判断两次输入的密码是否相同
   */
    oncheckInformation() {
      if (this.password === this.confirmPassword && this.saveUser()) {
          this.next();
          this.params.checkInformationResult = false;
      } else {
          this.params.checkInformationResult = true;
          console.log('两次密码不一样');
      }
  }
  saveUser(): boolean {
    const res: boolean = this.userService.updatePassword(this.confirmPassword);
    if (res === true) {
      console.log('重置成功');
      return true;
    } else {
      console.log('重置失败');
      return false;
    }
  }
  /**
   * 跳转至登陆界面
   */
  gotoLoginPage() {
    this.slideIndex = 0;
    this.password = '';
    this.confirmPassword = '';
    this.phone = '';
    this.verifyCode.code = '';
    this.router.navigateByUrl('/login');
  }



async  onClick() {
  const user = this.localStorage.get('user', '');
  if (this.account === '') {
    const toast = await this.toastCtrl.create({
    message: '请输入您的邮箱或者手机号码',
    duration: 3000
  });
    toast.present();
  } else if (this.account !== user.accounts[0].identifier && this.account !== user.accounts[1].identifier) {
    const alert = await this.alertCtrl.create({
    header: '提示',
    message: '该账号为注册',
    buttons: ['知道了']
  });
    alert.present();
  } else {
    const alert = await this.alertCtrl.create({
    header: '提示',
    message: '验证消息已发送，请及时查看',
    buttons: ['知道了']
  });
    alert.present();
    this.router.navigateByUrl('/login');
  }
  }

  // 禁用菜单
  ionViewWillEnter() {
    this.menuController.enable(false);
  }
}
