import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Item } from '../item-list/item-list.component';

export class Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Item[] = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  increaseItemQuantity(item: Item): void {
    this.cartService.increaseItemQuantity(item);
  }

  decreaseItemQuantity(item: Item): void {
    this.cartService.decreaseItemQuantity(item);
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (let item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

  checkout(): void {
    this.cartService.clearCart();
    this.router.navigate(['/shipping']);
  }

}
