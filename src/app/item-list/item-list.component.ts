import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Item } from './item.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [
    new Item(1, 'Bolo de Chocolate', '', 15.99, 'assets/img/doce1.jpeg', 0),
    new Item(2, 'Torta de Limão', '', 12.99, 'assets/img/doce2.jpeg', 0),
    new Item(3, 'Cheesecake de Morango', '', 18.99, 'assets/img/doce3.jpeg', 0),
    new Item(4, 'Pavê de Amendoim', '', 14.99, 'assets/img/doce4.jpeg', 0),
    new Item(5, 'Tiramisu', '', 19.99, 'assets/img/doce5.jpeg', 0),
    new Item(6, 'Tiramisu', '', 19.99, 'assets/img/doce6.jpeg', 0)
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.productService.getProducts().subscribe((products) => {
      if (products.length > 0) {
        this.items = products;
      }
    });
  }

  addItem(item: Item, quantity: number) {
    this.cartService.addItem(item, quantity);
    item.quantity = 0; // Zera a quantidade do item após adicioná-lo ao carrinho
  }

  decreaseQuantity(item: Item): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  increaseQuantity(item: Item): void {
    if (item.quantity < 10) {
      item.quantity++;
    }
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
