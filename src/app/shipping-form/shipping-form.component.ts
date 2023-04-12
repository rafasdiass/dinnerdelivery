import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Order } from '../order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(customerData: any) {
    const order: Order = {
      customer: customerData,
      items: this.cartService.getItems(),
      total: this.cartService.calculateTotalPrice()
    };
    console.warn('Seu pedido foi submetido', order);
    this.cartService.clearCart();
    this.form.reset();
    this.router.navigate(['/']);
  }
}
