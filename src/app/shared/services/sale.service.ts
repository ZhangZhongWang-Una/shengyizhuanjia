import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor() { }

  getSales(): number {
    return Math.random() * (999 - 10000) + 100000;
  }
}
