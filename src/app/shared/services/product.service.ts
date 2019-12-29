import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { AjaxResult } from '../model/ajax-result';
export const PRODUCT_KEY = 'Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService) { }


  /**
   * 插入商品
   */
  async insert(input: Product): Promise<AjaxResult> {
    const res = this.localStorageService.get(PRODUCT_KEY, []);
    input.id = this.autoIncrement(res);
    res.push(input);
    this.localStorageService.set(PRODUCT_KEY, res);
    return {
      targetUrl: '',
      result: res,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  /**
   * 获取自增长id
   */
  autoIncrement(array: Product[]): number {
    const length = Product.length;
    if (length === 0) {
      return 1;
    } else {
      return Product[length - 1].id + 1;
    }
  }
}
