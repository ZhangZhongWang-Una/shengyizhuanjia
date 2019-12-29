import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AjaxResult } from '../model/ajax-result';
import { Supply } from '../model/supply';
export const SUPPLY_KEY = 'Supply';
@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 新增供应商
   */
  async insert(supply: Supply): Promise<AjaxResult> {
    let tmp = this.localStorageService.get(SUPPLY_KEY, []);
    supply.id = this.autoIncrement(tmp).toString();
    tmp.push(supply);
    this.localStorageService.set(SUPPLY_KEY, tmp);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  /**
   * 获取所有供应商
   */
  async getAll(): Promise<AjaxResult> {
    // console.log('1');
    const tmp = this.localStorageService.get(SUPPLY_KEY, []);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  /**
   * 获取自增长id
   */
  autoIncrement(array: Supply[]): number {
    const length = Supply.length;
    if (length === 0) {
      return 1;
    } else {
      return Supply[length - 1].id + 1;
    }
  }
}
