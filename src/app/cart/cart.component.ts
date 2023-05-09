import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
  }

  changeDeliveryOption(option: string): void {
    this.cartService.setDeliveryOption(option);
  }

  decreaseItemQuantity(productId: string): void {
    this.cartService.decreaseItemQuantity(productId);
  }

  increaseItemQuantity(productId: string): void {
    this.cartService.increaseItemQuantity(productId);
  }

  checkout(): void {
    this.cartService.clearCart();
    this.router.navigate(['/shipping']);
  }

  addMoreItems(): void {
    this.router.navigate(['/']); // Aqui você pode alterar o caminho de rota para a página desejada
  }
}
