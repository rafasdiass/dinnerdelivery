import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../item-list/item.model';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {
  private apiUrl = 'http://3.83.176.3'; // Atualize para o domínio da sua API

  constructor(private http: HttpClient) {}

  newProduct: Item = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    quantity: 0,
  };
  
  items: Item[] = [];

  addProduct(form: NgForm): void {
    // Adicione o novo produto à lista de produtos existente
    this.items.push(this.newProduct);

    // Exibe uma mensagem no console confirmando o cadastro do produto
    console.log('Produto cadastrado com sucesso:', this.newProduct);

    // Limpe os campos do formulário
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      quantity: 0, 
    };

    // Reseta o formulário para seu estado inicial
    form.resetForm();
  }
}
