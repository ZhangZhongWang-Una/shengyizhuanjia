import { CategoryService } from 'src/app/shared/services/category.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { ModalController, IonItemSliding, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/model/category';
import { CategoryEditNamePage } from '../category-edit-name/category-edit-name.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {
  private categoryId: any;
  private category: Category;
  constructor(private modalController: ModalController,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private alertController: AlertController,
              private router: Router) {
                this.activatedRoute.queryParams.subscribe(queryParams => {
                  this.categoryId = queryParams.categoryId;
                  this.category = this.categoryService.findCategoryById(this.categoryId);
                });
               }

  ngOnInit() {
  }

  /**
   * 弹出模态框并传递参数
   */
  private async presentModal(name: string) {
    const modal = await this.modalController.create({
      component: CategoryEditNamePage,
      componentProps: { value: name}
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  /**
   * 编辑分类名字
   */
  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    console.log(this.category);
    const {data} = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
    }
  }

  /**
   * 编辑子分类名字
   */
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const {data} = await this.presentModal(subCategory.name);
    if (data) {
      subCategory.name = data;
    }
  }

  /**
   * 删除分类
   */
  async onDelete(item: IonItemSliding, subId?: number) {
    const alert = await this.alertController.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            if (subId != null) { // 删除商品子分类
              item.close();
              this.categoryService.deleteSubCategoryById(this.category, subId);
              this.category = this.categoryService.findCategoryById(this.categoryId);
            } else if (this.category.children.length === 0) { // 删除商品分类
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.router.navigateByUrl('/category-list');
            } else {
              item.close();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * 离开页面时保存修改数据
   */
  ionViewDidLeave() {
    if (this.categoryService.modifyCategory(this.category)) {
      console.log('保存成功');
    } else {
      console.log('保存失败');
    }
  }
}
