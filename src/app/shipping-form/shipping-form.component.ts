import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  shippingOption: string = 'pickup';
  name: string = '';
  whatsapp: string = '';
  street: string = '';
  neighborhood: string = '';
  number: string = '';
  zipcode: string = '';
  reference: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.shippingOption = this.cartService.getShippingOption();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const customerData = {
        shippingOption: this.shippingOption,
        name: this.name,
        whatsapp: this.whatsapp,
        street: this.street,
        neighborhood: this.neighborhood,
        number: this.number,
        zipcode: this.zipcode,
        reference: this.reference,
      };
      // Lógica para salvar os dados do cliente ou processar o pedido

      this.cartService.clearCart();
      this.router.navigate(['/payment']);
    }
  }
}
