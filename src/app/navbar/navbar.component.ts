import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service'; // Certifique-se de que o caminho do import esteja correto
import { Subscription } from 'rxjs';
import { ItemListComponent } from '../item-list/item-list.component';
import { Cart } from '../item-list/cart.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private cartChangedSubscription: Subscription | null;

  constructor(public cartService: CartService) {
    this.cartChangedSubscription = null;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.cartChangedSubscription) {
      this.cartChangedSubscription.unsubscribe();
    }
  }
}
