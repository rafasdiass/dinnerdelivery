import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dinnerdelivery';
  totalItems: number = 0;
  private cartChangedSubscription: Subscription | null;

  constructor(private cartService: CartService) {
    this.cartChangedSubscription = null;
  }

  ngOnInit(): void {
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
