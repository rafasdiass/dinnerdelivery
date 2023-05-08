import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../item-list/cart-item.model';
import { Cart } from '../item-list/cart.model';
import { Item } from '../item-list/item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Inicializando cartItems como um array vazio
  public cart: Cart | null = this.cartService.cart;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
    this.cartService.setTotalItems(this.cart?.products.length as number)
  }

  changeDeliveryOption(option: string): void {
    this.cartService.setDeliveryOption(option);
  }

  decreaseItemQuantity(productId: string): void {

    this.cartService.decreaseItemQuantity(productId);
    this.cart = this.cartService.cart
  }

  increaseItemQuantity(productId: string): void {

    this.cartService.increaseItemQuantity(productId);
    this.cart = this.cartService.cart;

  }

  calculateTotalPrice(): number {
    let total = 0;

    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.getTotalPrice();
    }
    totalPrice += this.cartService.getDeliveryFee();
    return totalPrice;
  }

  checkout(): void {
    this.cartService.clearCart();
    this.router.navigate(['/shipping']);
  }

  addMoreItems(): void {
    this.router.navigate(['/']); // Aqui você pode alterar o caminho de rota para a página desejada
  }
}
