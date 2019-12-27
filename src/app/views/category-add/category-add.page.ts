import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/model/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {
  headTitle: any;
  categoryName: any;
  category: Category;
  newCategoryName: string;
  categoryId: number;
  subCategoryId: number;
  constructor(private activatedRouter: ActivatedRoute,
              private categoryService: CategoryService,
              private toastCtrl: ToastController,
              private router: Router) {
                this.activatedRouter.queryParams.subscribe(queryParams => {
                  this.categoryName = queryParams.categoryName;
                  if (this.categoryName !== '大分类') {
                    this.headTitle = '新增小分类';
                    this.categoryId = this.categoryService.findCategoryIndexByName(this.categoryName) + 1;
                    this.subCategoryId = this.categoryService.findSubCategoryLastIndexByCategoryName(this.categoryName) + 1;
                    this.category = {
                      id: this.categoryId,
                      name: '',
                      children: [{
                        id: this.categoryId * 10 + this.subCategoryId ++,
                        name: '',
                        children: []
                      }]
                    };
                  } else {
                    this.headTitle = '新增商品分类';
                    this.categoryId = this.categoryService.getCategoryLength() + 1;
                    this.subCategoryId = 1;
                    this.category = {
                      id: this.categoryId,
                      name: '',
                      children: [{
                        id: this.categoryId * 10 + this.subCategoryId ++,
                        name: '',
                        children: []
                      }]
                    };
                  }
                });
               }

  ngOnInit() {
  }

  /**
   * 新增商品小分类
   */
  addSubCategory() {
    this.category.children.push({
      id: this.categoryId * 10 + this.subCategoryId ++,
      name: '',
      children: []
    });
  }

  /**
   * 保存商品分类
   */
  async onSave() {
    if (this.categoryName === '大分类') { // 增加商品分类
      this.category.name = this.newCategoryName;
      if (this.categoryService.insert(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/category-list');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称或者名称不能为空',
          duration: 3000
        });
        toast.present();
      }

    } else { // 增加商品小分类
      this.category.name = this.categoryName;
      if (this.categoryService.insertSubCateCategory(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/category-list');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称或者名称不能为空',
          duration: 3000
        });
        toast.present();
      }
    }
  }
}
