import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../item-list/cart-item.model';
import { CartService } from '../cart.service';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { TempStorageService } from '../temp-storage.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  shippingForm!: FormGroup;
  cartItems: CartItem[] = [];
  orderPlaced = false;
  orderSummaryVisible = false;
  currentOrder: Order | null = null;

  @Output() orderPlacedEvent = new EventEmitter<Order>();
  @Output() showOrderSummaryEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private tempStorageService: TempStorageService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
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
      this.tempStorageService.setOrderData(this.cartItems, this.shippingForm.value); // Atualizado aqui
      this.orderService.createOrder(order).subscribe((createdOrder: Order) => {
        this.orderPlaced = true;
        this.currentOrder = createdOrder;
        this.orderPlacedEvent.emit(createdOrder);
        console.log('Order placed', createdOrder);
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.getTotalPrice(), 0);
  }

  handleShowOrderSummaryClick(): void {
    const orderData = this.tempStorageService.getOrderData(); // Atualizado para getOrderData
    if (orderData) {
      this.currentOrder = orderData;
      this.orderSummaryVisible = true;
      this.showOrderSummaryEvent.emit();
      this.tempStorageService.clearOrderData(); // Atualizado para clearOrderData
    }
  }
}
