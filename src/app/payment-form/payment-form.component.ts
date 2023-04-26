import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(private orderService: OrderService) {
    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      whatsapp: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      reference: new FormControl(''),
      shippingOption: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onCheckoutClick(): void {
    if (this.paymentForm.valid) {
      const orderData = {
        ...this.paymentForm.value,
      };

      this.orderService.createOrder(orderData).subscribe(
        (response) => {
          console.log(response);
          // Redirecione para a página de confirmação ou execute outras ações necessárias
        },
        (error) => {
          console.error(error);
          // Trate erros ao enviar o pedido
        }
      );
    }
  }
}
