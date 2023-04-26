import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../item-list/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Inicializando cartItems como um array vazio

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  changeDeliveryOption(option: string): void {
    this.cartService.setDeliveryOption(option);
  }

  decreaseItemQuantity(cartItem: CartItem): void {
    this.cartService.decreaseItemQuantity(cartItem.item);
  }

  increaseItemQuantity(cartItem: CartItem): void {
    this.cartService.increaseItemQuantity(cartItem.item);
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
