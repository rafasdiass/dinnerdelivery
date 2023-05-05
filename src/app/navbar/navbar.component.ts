import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service'; // Certifique-se de que o caminho do import esteja correto
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  totalItems: number = 0;
  private cartChangedSubscription: Subscription | null;

  constructor(private cartService: CartService) {
    this.cartChangedSubscription = null;
  }

  ngOnInit(): void {
    //FAZER REQ API PARA PEGAR O CARRINHO SE HOUVER
    this.totalItems = this.cartService.getTotalItems();
    this.cartChangedSubscription = this.cartService.cartChanged.subscribe((totalItems: number) => {
      this.totalItems = totalItems;
    });
  }

  ngOnDestroy(): void {
    if (this.cartChangedSubscription) {
      this.cartChangedSubscription.unsubscribe();
    }
  }
}
