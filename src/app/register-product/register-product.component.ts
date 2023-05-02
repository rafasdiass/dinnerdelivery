import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../item-list/item.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {
  constructor(private productService: ProductService) {}

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
    // Chame o método createProduct do serviço ProductService
    this.productService.createProduct(this.newProduct).subscribe(
      (response) => {
        console.log('Produto cadastrado com sucesso:', response);

        // Adicione o novo produto à lista de produtos existente
        this.items.push(response);

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
      },
      (error) => {
        console.error('Erro ao cadastrar o produto:', error);
      }
    );
  }
}
