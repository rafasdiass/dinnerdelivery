import { Component } from '@angular/core';
import { Item } from '../item-list/item.model';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {

  
  newProduct: Item = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    quantity: 0,
  };
  
  items: Item[] = [];

  addProduct() {
    // Adicione o novo produto à lista de produtos existente
    this.items.push(this.newProduct);

    // Limpe os campos do formulário
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      quantity: 0, 
    };
  }
}

