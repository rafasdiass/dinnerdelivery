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
    product_url: '',
    unit_price: 0,
    quantity: 0,
    quantityCart: 0,
    editingName: false,
    editingDescription: false,
    editingUnitPrice: false,
  };

  formData = new FormData();
  selectedFile: File | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Arquivo selecionado:', this.selectedFile);
    } else {
      this.selectedFile = null;
    }
  }

  createProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.unit_price) {
      this.productService.createProduct(this.newProduct).subscribe((response) => {
        console.log('Produto criado com sucesso!');
        this.newProduct = {
          id: '',
          name: '',
          description: '',
          unit_price: 0,
          product_url: '',
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
