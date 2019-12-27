import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { CategoryService, CATEGORY_KEY } from './../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/model/category';
import { ActionSheetController, Events } from '@ionic/angular';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  categories: Category[];
  activeCategory: Category;
  subCategories: Category[];
  activeSubCategory: Category;
  constructor(private categoryService: CategoryService,
              private actionSheetController: ActionSheetController,
              private router: Router,
              private events: Events) {
    categoryService.getAll().then((data) => {
      this.categories = data.result;
      if (this.categories) {
        this.activeCategory = this.categories[0];
        this.subCategories = this.activeCategory.children;
      }
    });
   }

   ionViewWillEnter() {
    this.categoryService.getAll().then((data) => {
        this.categories = data.result;
        if (this.categories != null) {
            this.activeCategory = this.categories[0];
            this.subCategories = this.activeCategory.children;
        }
    });
  }

  ngOnInit() {
  }

  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
        header: '选择您的操作',
        buttons: [
          {
            text: '新增小分类',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
              this.router.navigate(['/category-add'], {queryParams: {' catagoryName': this.activeCategory.name}});
            }
          }, {
            text: '编辑分类',
            handler: () => {
              console.log('Archive clicked');
              this.router.navigate(['/category-edit', this.activeCategory.id]);
            }
          }, {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
    await actionSheet.present();
  }

  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }

  selectCategory(category: Category) {
    this.activeCategory = category;
    this.subCategories = this.activeCategory.children;
  }

}
