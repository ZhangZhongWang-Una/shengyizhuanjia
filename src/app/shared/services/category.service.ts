import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { CATEGORIES } from '../model/mock.categories';
import { AjaxResult } from '../model/ajax-result';
import { Category } from '../model/category';
import { Subject, Observable } from 'rxjs';
import { AcitveCategory } from '../model/active-category';
export const CATEGORY_KEY = 'Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categorySubject = new Subject<AcitveCategory>();
  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 获取全部大分类
   */
  async getAll(): Promise<AjaxResult> {
    const categories = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    // this.localStorageService.set(CATEGORY_KEY, CATEGORIES);
    return {
      targetUrl: '',
      result: categories,
      success: true,
      error: null,
      unAuthorizedRequest: false
    };
  }

  /**
   * 增加商品分类
   */
  insert(category: Category): boolean {
    if (category == null || category.name === '') {
      return false;
    }
    if (this.isValidName(category) === false) {
      return false; // 子分类名称无效
    }
    const tmp = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    tmp.push(category);
    this.localStorageService.set(CATEGORY_KEY, tmp);
    return true;
  }

  /**
   * 判断小分类商品名字是否有效
   */
  isValidName(category: Category): boolean {
    if (category == null || (category.name === '')) {
      return false;
    }
    for (let i = 0; i< category.children.length; i++) {
      if (category.children[i].name === null || category.children[i].name === '') {
        return false; // 名称为空，跳出循环
      }
    }

    for (let i = 0; i < category.children.length - 1; i++) {
      for (let j = i + 1; j < category.children.length; j++) {
        if (category.children[i].name === category.children[j].name) {
          return false; // 找到相同名称，跳出循环
        }
      }
    }
    return true;
  }

  /**
   * 返回所有商品类别
   */
  all(): Category[] {
    return this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
  }

  /**
   * 通过ID查找商品类别
   */
  findCategoryIndexById(id: number): number {
    const cg = this.all();
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  /**
   * 通过名字查找商品类别
   */
  findCategoryIndexByName(name: string): number {
    const cg = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    for ( let i = 0; i < cg.length; i++) {
      if (cg[i].name === name) {
        return i;
      }
    }
    return -1;
  }

  /**
   * 更新本地的数据
   */
  update(category: Category[]) {
    this.localStorageService.set(CATEGORY_KEY, category);
  }

  /**
   * 增加商品小分类
   */
  insertSubCateCategory(category: Category): boolean {
    if (category === null) {
      return false;
    }
    const tmp = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    const index = this.findCategoryIndexByName(category.name);
    console.log(index);
    if (index === -1) {
      return false; // 未能找到索引
    }
    for (let j = 0; j < category.children.length; j++) {
      tmp[index].children.push(category.children[j]);
    }
    if (this.isValidName(tmp[index]) === false) {
      return false; // 名称无效
    } else {
      this.update(tmp);
      return true;
    }
  }

  /**
   * 通过分类名字找到它子分类的最后一个id
   */
  findSubCategoryLastIndexByCategoryName(name: string): number {
    const cg = this.all();
    for ( let i = 0; i < cg.length; i++) {
      if (cg[i].name === name) {
        return cg[i].children.length;
      }
    }
    return -1;
  }

  /**
   * 获得大分类的长度
   */
  getCategoryLength(): number {
    const cg = this.all();
    return cg.length;
  }

  /**
   * 获取商品类别
   */
  findCategoryById(id: string): Category {
    const cg = this.all();
    for ( let i = 0; i < cg.length; i++) {
      if (cg[i].id.toString() === id) {
        return cg[i];
      }
    }
    const category: Category = {
      id: -1,
      name: '',
      children: []
    };
    return category;
  }

  /**
   * 通过名字删除商品小分类
   */
  deleteSubCategoryById(category: Category, id: number): boolean {
    if (category == null) {
      return false;
    }
    for (let i = 0; i < category.children.length; i++) {
      if (category.children[i].id === id) {
        const index = this.findCategoryIndexByName(category.name);
        let tmp = this.all();
        tmp[index].children.splice(i, 1);
        this.localStorageService.set(CATEGORY_KEY, tmp);
        return true;
      }
    }
    return false;
  }

  /**
   * 通过id删除商品分类
   */
  deleteCategoryById(id: number): boolean {
    const tmp = this.all();
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].id === id) {
        tmp.splice(i, 1);
        this.localStorageService.set(CATEGORY_KEY, tmp);
        return true;
      }
    }
    return false;
  }

  /**
   * 通过传入商品分类修改数据
   */
  modifyCategory(cg: Category): boolean {
    const index = this.findCategoryIndexById(cg.id);
    if (index === -1) {
      return false;
    }
    let tmp = this.all();
    tmp[index] = cg;
    this.update(tmp);
    return true;
  }

  watchCategory(): Observable<AcitveCategory> {
    return this.categorySubject.asObservable();
  }
}
