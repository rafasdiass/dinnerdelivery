import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Item } from './item.model';
import { ProductService } from '../services/product.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  // items: Item[] = [
  //   new Item('1', 'Bolo de Chocolate', '', 15.99, 'assets/img/doce1.jpeg', 0),
  //   new Item('2', 'Torta de Limão', '', 12.99, 'assets/img/doce2.jpeg', 0),
  //   new Item('3', 'Cheesecake de Morango', '', 18.99, 'assets/img/doce3.jpeg', 0),
  //   new Item('4', 'Pavê de Amendoim', '', 14.99, 'assets/img/doce4.jpeg', 0),
  //   new Item('5', 'Tiramisu', '', 19.99, 'assets/img/doce4.jpeg', 0),
  //   new Item('6', 'Tiramisu', '', 19.99, 'assets/img/doce4.jpeg', 0),
  // ];

  items: Item[] = []
  quantity: number = 0

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService
  ) {}

  setQuantityCart(): void {
    this.items.map(item => {
      item.quantityCart = 0
    })
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.productService.getProducts().subscribe((products) => {
      if (products.length > 0) {
        this.items = products;
        this.setQuantityCart();
      }
    });
  }

  // addItem(item: Item, quantity: number) {
  //   // Adicione o produto ao carrinho usando o serviço CartService (localmente)
  //   this.cartService.addItem(item, quantity);

  //   // Obtenha o ID do carrinho de compras do serviço CartService
  //   const shoppingCartId = this.cartService.getShoppingCartId();

  //   }
  //   // Adicione o produto ao carrinho usando o serviço ProductService (API)
  //   this.productService.addProductToCart(item.id, quantity, shoppingCartId).subscribe(() => {
  //     console.log('Produto adicionado ao carrinho (API)');
  //   });

  //   item.quantity = 0; // Zera a quantidade do item após adicioná-lo ao carrinho
  // }

  decreaseQuantity(item: Item): void {
    if (item.quantityCart > 0) {
      item.quantityCart--;
    }
  }

  increaseQuantity(item: Item): void {
    if (item.quantityCart < 10) {
      item.quantityCart++;
    }
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }

  addProductToCart(productId: string, quantity: number) {
    // const idCart: string | null = localStorage.getItem('idCart');
    // console.log(idCart);
    // if (idCart) {
    //   this.productService.addProductToCartWithID(quantity, idCart);
    // }
    const item = this.items.find((item) => item.id === productId);

    this.cartService.addProductToCart(productId, quantity);
  }
}
