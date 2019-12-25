import { ISLOGIN_KEY } from './../welcome/welcome.page';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private navCtrl: NavController,
              private router: Router) { }

  private version: any = '';

  ngOnInit() {
    const app = this.localStorageService.get('App', {version: '1.0.0'});
    this.version = app.version;
  }

  /**
   * 登出
   */
  onLogout() {
    const isLogin = {
      hasLogin : false,
      time : ''
    };
    this.localStorageService.set(ISLOGIN_KEY, isLogin);
    this.router.navigateByUrl('/login');
  }
}
