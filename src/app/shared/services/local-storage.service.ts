import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: any = window.localStorage;
  constructor() { }
  // 从本地存储中获取数据
  get(key: string, defaultValue: any): any {
    let value: any = this.storage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value === null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }
  // 添加或者修改本地储存中的数据
  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  // 删除本地储存中的数据
  remove(key: string) {
    this.storage.removeItem(key);
  }
}
