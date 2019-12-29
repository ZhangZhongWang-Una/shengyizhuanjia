import { Component, OnInit } from '@angular/core';
import { Supply } from 'src/app/shared/model/supply';
import { ModalController } from '@ionic/angular';
import { SupplyService } from 'src/app/shared/services/supply.service';

@Component({
  selector: 'app-supply-select',
  templateUrl: './supply-select.page.html',
  styleUrls: ['./supply-select.page.scss'],
})
export class SupplySelectPage implements OnInit {
  suppliers: Supply[];
  activeSupplier: Supply = {
    id: null,
    name: '',
    phone: null
  };
  constructor(private modalController: ModalController,
              private supplyService: SupplyService) {
                this.supplyService.getAll().then((data) => {
                  if (data.success) {
                    this.suppliers = data.result;
                  } else {
                    console.log('读取本地供应商数据失败');
                  }
                });
               }

  ngOnInit() {
  }

  /**
   * 关闭模态窗口，并把分类名称传回给分类编辑页面
   */
  dismiss(supplier?: Supply) {
    this.modalController.dismiss(this.activeSupplier);
  }

  /**
   * 返回参数
   */
  onSave() {
    this.dismiss(this.activeSupplier);
  }

  /**
   * 选中当前供应商
   */
  onClick(supplier: Supply) {
    this.activeSupplier = supplier;
  }

  /**
   * 选中颜色变化
   */
  getItemColor(id: string): string {
    if (id === this.activeSupplier.id) {
      return 'primary';
    } else {
      return '';
    }
  }
}
