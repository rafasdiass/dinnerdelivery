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
    // ... lista de itens ...
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
    // Adicione o produto ao carrinho usando o serviço CartService (localmente)
    this.cartService.addItem(item, quantity);

    // Obtenha o ID do carrinho de compras do serviço CartService
    const shoppingCartId = this.cartService.getShoppingCartId();

    // Adicione o produto ao carrinho usando o serviço ProductService (API)
    this.productService.addProductToCart(item.id, quantity, shoppingCartId).subscribe(() => {
      console.log('Produto adicionado ao carrinho (API)');
    });

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
