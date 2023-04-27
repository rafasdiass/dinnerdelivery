import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../item-list/cart-item.model';
import { CartService } from '../cart.service';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  shippingForm: FormGroup;
  cartItems: CartItem[] = [];
  orderPlaced = false;
  orderData: Partial<Order> = {};
  orderSummaryVisible = false;
  @Output() orderPlacedEvent = new EventEmitter<Order>();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      whatsapp: ['', Validators.required],
      shippingOption: ['delivery', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}')]],
      reference: [''],
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.getTotalPrice();
    }
    return totalPrice;
  }

  placeOrder(): void {
    if (this.shippingForm.valid) {
      const order: Order = {
        name: this.shippingForm.value.name,
        whatsapp: this.shippingForm.value.whatsapp,
        shippingOption: this.shippingForm.value.shippingOption,
        street: this.shippingForm.value.street,
        neighborhood: this.shippingForm.value.neighborhood,
        number: this.shippingForm.value.number,
        zipcode: this.shippingForm.value.zipcode,
        reference: this.shippingForm.value.reference,
        cartItems: this.cartItems,
        totalPrice: this.getTotalPrice(),
      };
      this.orderData = order;
      this.orderService.createOrder(order).subscribe(() => {
        this.orderPlaced = true;
        this.orderPlacedEvent.emit(order);
        console.log('Order placed', order);
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  showOrderSummary() {
    this.orderSummaryVisible = true;
  }
}