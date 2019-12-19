import { APP_KEY, ISLOGIN_KEY } from './../views/welcome/welcome.page';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { CanActivate, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean  {
        const appConfig: any = this.localStorageService.get(APP_KEY, {
      hasRun: false,
      version: '1.0.0'
    });
        const isLoginConfig: any = this.localStorageService.get(ISLOGIN_KEY, {
      hasLogin: false,
      loginTime: Date.now()
    });
    // tslint:disable-next-line: align
    if ( appConfig.hasRun === false ) {
      appConfig.hasRun = true;
      this.localStorageService.set(APP_KEY, appConfig);
      this.router.navigateByUrl('home');
      return true;
    } else {
      const now = new Date(+new Date() - 136 * 3600 * 1000 ).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      if (now < isLoginConfig.time && isLoginConfig.hasLogin === true) {
        this.router.navigateByUrl('home');
        return true;
      } else {
        return true;
      }
    }
  }
}
