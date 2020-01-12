import { SupplyService } from './../../shared/services/supply.service';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/model/product';
import { Subscription } from 'rxjs';
import { ActionSheetController, NavController, Events, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/model/category';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Supply } from 'src/app/shared/model/supply';
import { SupplySelectPage } from '../supply-select/supply-select.page';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit, OnDestroy {
  subscription: Subscription;
  product: Product;
  // 调用相机时传入的参数
  private cameraOpt = {
    quality: 50,
    destinationType: 0, // 0 Camera.DestinationType.DATA_URL 1 Camera.DestinationType.FILE_URI,
    sourceType: 1, // Camera.PictureSourceType.CAMERA,
    encodingType: 0, // Camera.EncodingType.JPEG,
    mediaType: 0, // Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true
  };
  // 调用相册时传入的参数
  private imagePickerOpt = {
    quality: 50,  // 照片质量，1-100，默认50
    destinationType: 0, // Camera.DestinationType.DATA_URL, 返回的数据类型，默认DATA_URL
    enodingType: 0, // Camera.EncodingType.JPEG,  照片格式，默认JPEG，还有PNG可选
    mediaType: 0, // Camera.MediaType.PICTURE,  媒体类型，默认PICTURE->照片，还有VIDEO等可以选
    sourceType: 0 // Camera.PictureSourceType.PHOTOLIBRARY 来源类型，默认CAMERA->相机，还有PHOTOLIBRARY->相册等可以选
  };

  constructor(private actionSheetCtrl: ActionSheetController,
              private productService: ProductService,
              private categoryService: CategoryService,
              public events: Events,
              private alertCtrl: AlertController,
              private router: Router,
              private barcodeScanner: BarcodeScanner,
              private camera: Camera,
              private supplyService: SupplyService,
              private modalCtrl: ModalController,
              private zone: NgZone) {
                this.initProduct();
                this.product.categoryName = '默认分类';
                this.product.supplier = new Supply();
                this.product.supplier.name = '输入商品供应商';
                this.ionViewDidEnter();
                // 观察者
                this.subscription = categoryService.watchCategory().subscribe(
                  (activeCategory) => {
                  },
                  (error) => {
                  }
                );
               }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * 初始化商品
   */
  private initProduct(): void {
    this.product = {
      id: 0,
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '', // 条码
      images: [],
      price: null, // 售价
      purchasePrice: null, // 进价
      inventory: null, // 库存
      supplier: null, // 供货商
      standard: '', // 规格
      remark: ''
    };
  }

  /**
   * 上传图片
   */
  async onPresentActiveSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('进入相机');
            this.onCamera();
          }
        }, {
            text: '相册',
              handler: () => {
              console.log('进入相册');
              this.onImagePicker();
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

  /**
   * 保存
   */
  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.initProduct();
          this.product.categoryName = '默认分类';
          // this.product.supplier.name = '输入商品供应商';
        } else {
          this.router.navigateByUrl('/productList');
        }
      } else {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }

  /**
   * 进入页面时订阅
   */
  ionViewDidEnter() {
    // 订阅消息
    this.events.subscribe('category:selected', (category, time) => {
      console.log(category.name, time);
      this.product.category = category;
      this.product.categoryName = category.name;
      this.product.categoryId = category.id;
    });
  }

  /**
   * 离开页面 取消订阅
   */
  ionViewLeave() {
    this.events.unsubscribe('category:selected');
  }

  /**
   * 转跳到商品类别界面
   */
  gotoCategyList() {
    this.router.navigate(['/category-list'], {
      queryParams: {
        tab : 'FromProductAdd'
      }
    });
    // this.router.navigateByUrl('/category-list');
  }

  /**
   * 扫描条码
   */
  onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.product.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

   /**
    * 启动拍照功能
    */
   private onCamera() {
    this.camera.getPicture(this.cameraOpt).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      console.log('ERROR:' + err);
    });
  }

  /**
   * 打开相册
   */
  private onImagePicker() {
    this.camera.getPicture(this.imagePickerOpt).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      console.log('ERROR:' + err);
    });
  }

  /**
   * 展示模态框
   */
  private async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SupplySelectPage,
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  /**
   * 点击供应商时，判断本地是否有供应商数据
   */
  async onClickSupplier() {
    let suppliers: Supply[];
    this.supplyService.getAll().then(async (data) => {
      suppliers = data.result;
      if (suppliers.length <= 0) {
        this.presentAlertPrompt(); // 本地没有供应商数据
      } else {
        // 调用模态框
        // console.log('调用模态框');
        const {data} = await this.presentModal();
        if (data) {
          this.product.supplier = data;
          console.log(this.product);
        }
      }
    });
  }

  /**
   * 本地没有供应商数据，输入供应商
   */
  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: '新增供货商',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '输入供货商名称'
        },
        {
          name: 'phone',
          type: 'number',
          placeholder: '输入供货商电话'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '保存',
          handler: (data) => {
            this.zone.run(() => {
              const supplier = new Supply();
              supplier.name = data.name;
              supplier.phone = data.phone;
              this.supplyService.insert(supplier).then((res) => {
                  if (res.success) {
                    console.log('保存成功');
                    this.product.supplier = supplier;
                  } else {
                    console.log('保存失败');
                  }
              });
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

}
