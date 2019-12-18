import { APP_KEY } from './../views/welcome/welcome.page';
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
    // tslint:disable-next-line: align
    if ( appConfig.hasRun === false ) {
      appConfig.hasRun = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      this.router.navigateByUrl('home');
      return false;
    }
  }
}
