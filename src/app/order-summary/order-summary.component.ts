import { Component, Input } from '@angular/core';
import { CartItem } from '../item-list/cart-item.model';
import { Order } from '../order';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() orderData!: Order;

  constructor() {}

  onPrint(): void {
    window.print();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}
