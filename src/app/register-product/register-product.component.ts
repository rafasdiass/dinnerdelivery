import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Item } from '../item-list/item.model';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css'],
})
export class RegisterProductComponent implements OnInit {
  newProduct: Item = {
    id: '',
    name: '',
    description: '',
    unit_price: 0,
    imageUrl: '',
    quantity: 0,
    quantityCart: 0,
    editingName: false,
    editingDescription: false,
    editingUnitPrice: false,
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  createProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.unit_price) {
      this.productService.createProduct(this.newProduct).subscribe((response) => {
        console.log('Produto criado com sucesso!');
        this.newProduct = {
          id: '',
          name: '',
          description: '',
          unit_price: 0,
          imageUrl: '',
          quantity: 0,
          quantityCart: 0,
          editingName: false,
          editingDescription: false,
          editingUnitPrice: false,
        };
      });
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  }
}
