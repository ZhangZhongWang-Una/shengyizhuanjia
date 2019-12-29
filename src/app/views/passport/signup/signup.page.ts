import { APP_KEY } from './../../welcome/welcome.page';
import { Register } from './../register';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AuthenticationCodeService } from 'src/app/shared/services/authentication-code.service';
import { NavController, IonSlides, AlertController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserServiceService } from 'src/app/shared/services/user-service.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupPage implements OnInit {

  constructor(private authenticationCode: AuthenticationCodeService,
              private navCtrl: NavController,
              private router: Router,
              private localStorageService: LocalStorageService,
              private userService: UserServiceService,
              public alertController: AlertController,
              private menuController: MenuController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

    @ViewChild('signupSlides', {static: true}) signupSlides: IonSlides;
    signup: Register = {
      phone: '',
      email: '',
      shopName: '',
      password: '',
      confirmPassword: '',
    };
    submited = false;
    slideIndex: any = 0;

    // 验证码倒计时
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

    /**
     * 记录当前slide的索引
     */
    onSlideDidChange() {
  }

  /**
   * 停止轮播
   */
  ngOnInit() {
      this.signupSlides.lockSwipes(true);
  }
  next() {
      this.signupSlides.lockSwipes(false);
      this.signupSlides.slideNext();
      this.slideIndex++;
      this.signupSlides.lockSwipes(true);
  }
  previous() {
      this.signupSlides.lockSwipes(false);
      this.signupSlides.slidePrev();
      this.slideIndex--;
      this.signupSlides.lockSwipes(true);
  }
  onSignupPhone() {
      // console.log(this.submited);
          this.submited = true;
          // 已通过客户端验证
          this.next();
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
   * 验证码--短信验证
   */
  async getCode() {
    if (this.signup.phone === '') {
      console.log('请填写手机号！');
      return;
    } else {
      this.authenticationCode.sendSms(this.signup.phone, this.verifyCode.codeLength);
      // 发送验证码成功后开始倒计时
      this.verifyCode.disable = false;
      this.settime();
    }
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
    // console.log('sureCode : ' + this.signup.confirmPassword);
    if (this.signup.password === this.signup.confirmPassword && this.saveUser()) {
        this.next();
        this.params.checkInformationResult = false;
    } else {
        this.params.checkInformationResult = true;
        console.log('两次密码不一样');
    }
  }

  /**
   * 跳转欢迎页面
   */
  returnWelcome() {
    this.router.navigateByUrl('/welcome');
    this.resetWelcome();
  }

  /**
   * 重置欢迎界面
   */
  resetWelcome() {
    const app = this.localStorageService.get(APP_KEY, {
      hasRun: false,
      version: '1.0.0'
    });
    const appConfig: any = app;
    if ( appConfig.hasRun === true ) {
      appConfig.hasRun = false;
      this.localStorageService.set(APP_KEY, appConfig);
    }

    this.slideIndex = 0;
    this.submited = false;
    // 重置signup
    this.signup.password = '';
    this.signup.confirmPassword = '';
    this.signup.phone = '';
    this.signup.email = '';
    this.signup.shopName = '';

    // 重置verifyCode
    this.verifyCode.code = '';
  }

  /**
   * 保存用户信息 和 商铺信息
   */
  saveUser(): boolean {
      const res: boolean = this.userService.signUp(this.signup);
      if (res === true) {
        console.log('注册成功');
        return true;
      } else {
        console.log('注册失败');
        return false;
      }
  }

  /**
   * 跳转至登陆界面
   */
  gotoLoginPage() {
      this.slideIndex = 0;
      this.submited = false;
      // 重置signup
      this.signup.password = '';
      this.signup.confirmPassword = '';
      this.signup.phone = '';
      this.signup.email = '';
      this.signup.shopName = '';

      // 重置verifyCode
      this.verifyCode.code = '';

      this.router.navigateByUrl('/login');
    }
}
