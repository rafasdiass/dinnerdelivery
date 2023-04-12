import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  paymentForm = this.formBuilder.group({
    name: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.paymentForm.value);
  }

}
