import { Supply } from './supply';
export class Product {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    category: any;
    barcode: string;
    images: string[];
    price: number;
    purchasePrice: number;
    inventory: number;
    supplier: Supply;
    standard: string;
    remark: string;
   }
