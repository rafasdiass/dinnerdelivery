import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { Order } from './order';
import { CartItem } from './item-list/cart-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dinnerdelivery';
  totalItems: number = 0;
  cartItems: CartItem[] = [];
  currentOrder: Order | null = null;
  orderSummaryVisible = false;
  private cartChangedSubscription: Subscription | null;

  constructor(private cartService: CartService) {
    this.cartChangedSubscription = null;
  }

  ngOnInit(): void {
    this.totalItems = this.cartService.getTotalItems();
    this.cartItems = this.cartService.getCartItems();
    this.cartChangedSubscription = this.cartService.cartChanged.subscribe((totalItems: number) => {
      this.totalItems = totalItems;
    });
  }

  ngOnDestroy(): void {
    if (this.cartChangedSubscription) {
      this.cartChangedSubscription.unsubscribe();
    }
  }

  orderPlaced(order: Order): void {
    this.currentOrder = order;
  }

  showOrderSummary(order: Order): void {
    this.orderSummaryVisible = true;
    this.currentOrder = order;
  }

  handleShowOrderSummary(): void {
    this.orderSummaryVisible = !this.orderSummaryVisible;
  }
}
