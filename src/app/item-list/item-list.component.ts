import { Component, OnInit } from '@angular/core';
import { Item } from './item-list/';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

export class ItemListComponent implements OnInit {

  items: Item[] = [
    { id: 1, name: 'Bolo de Chocolate', price: 15.99 },
    { id: 2, name: 'Torta de Limão', price: 12.99 },
    { id: 3, name: 'Cheesecake de Morango', price: 18.99 },
    { id: 4, name: 'Pavê de Amendoim', price: 14.99 },
    { id: 5, name: 'Tiramisu', price: 19.99 }
  ];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  addItem(item: Item) {
    this.cartService.addItem(item);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
