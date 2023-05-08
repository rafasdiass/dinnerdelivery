import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  shippingOption: string = 'pickup';
  name: string = '';
  street: string = '';
  neighborhood: string = '';
  number: string = '';
  zipcode: string = '';
  reference: string = '';
  valorDinheiro: string = '';
  trocoDinheiro: string = '';

  constructor(private cartService: CartService, private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.shippingOption = this.cartService.getShippingOption();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const customerData = {
        shippingOption: this.shippingOption,
        name: this.name,
        number: this.number,
        street: this.street,
        neighborhood: this.neighborhood,
        zipcode: this.zipcode,
        reference: this.reference,
        valorDinheiro: this.valorDinheiro,
        trocoDinheiro: this.trocoDinheiro,
      };

          // Chama o método createOrder do OrderService para enviar os dados do pedido ao back-end
          this.orderService.createOrder(customerData).subscribe(
            (response) => {
              console.log('Pedido enviado com sucesso:', response);
              // Redireciona para a página de confirmação de pagamento
              this.cartService.clearCart();
              this.router.navigate(['/payment']);
            },
            (error) => {
              console.error('Erro ao enviar pedido:', error);
              // Trata o erro
              // ...
            }
          );
    }
  }
  mostrarCampoDinheiro() {
    const select: HTMLSelectElement = document.getElementById("forma-pagamento") as HTMLSelectElement;
    const campoDinheiro = document.getElementById("campo-dinheiro") as HTMLElement; // Usando type assertion para informar que o elemento sempre existira no DOM

    if (select.value == "dinheiro") {
      campoDinheiro.style.display = "block";
    } else {
      campoDinheiro.style.display = "none";
    }
    if (select.value == "") {
      campoDinheiro.style.display = "none";
    }
  }
}
