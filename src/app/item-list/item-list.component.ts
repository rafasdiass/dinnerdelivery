import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Item } from './item.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  quantity: number = 0;
  searchTerm: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService
  ) {}

  setQuantityCart(): void {
    this.items.map((item) => {
      item.quantityCart = 0;
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      if (products.length > 0) {
        this.items = products;
        this.setQuantityCart();
      }
    });
  }

  decreaseQuantity(item: Item): void {
    if (item.quantityCart > 0) {
      item.quantityCart--;
    }
  }

  increaseQuantity(item: Item): void {
    if (item.quantity > item.quantityCart) {
      if (item.quantityCart < 10) {
        item.quantityCart++;
      }
    } else {
      alert('Out of Stock Quantity');
    }
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }

  addProductToCart(productId: string, quantity: number) {
    const item = this.items.find((item) => item.id === productId);

    this.cartService.addProductToCart(productId, quantity);

    this.items.map((item) => (item.quantityCart = 0));
  }
}
