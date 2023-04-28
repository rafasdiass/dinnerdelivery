import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../item-list/cart-item.model';
import { Order } from '../order';
import { TempStorageService } from '../temp-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  cartItems: CartItem[] = [];
  private shippingDataSubscription: Subscription | null = null;

  constructor(private tempStorageService: TempStorageService) {}

  ngOnInit(): void {
    const orderData = this.tempStorageService.getOrderData();
    console.log('Order data from getOrderData():', orderData);
    
    if (orderData) {
      this.order = orderData;
      this.cartItems = orderData.cartItems;
    }
  
    this.shippingDataSubscription = this.tempStorageService.orderData$.subscribe((order: Order | null) => {
      console.log('Order data from orderData$ subscription:', order);
      
      if (order) {
        this.order = order;
        this.cartItems = order.cartItems;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.shippingDataSubscription) {
      this.shippingDataSubscription.unsubscribe();
    }
  }

  getTotal(): number {
    let total = 0;
    for (let cartItem of this.cartItems) {
      total += cartItem.item.price * cartItem.quantity;
    }
    return total;
  }

  onPrint() {
    window.print();
  }
}