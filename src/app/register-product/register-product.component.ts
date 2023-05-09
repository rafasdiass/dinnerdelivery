import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Item } from '../item-list/item.model';
import { Observable } from 'rxjs';

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
      this.saveProduct().subscribe((response) => {
        const productId = response.id;
        console.log('ID do produto:', productId);
        if (this.selectedFile) {
          this.formData.append('image', this.selectedFile, this.selectedFile.name);
          console.log('FormData:');
          this.formData.forEach((value, key) => {
            console.log(`${key}:`, value);
          });
          this.productService.uploadFile(productId, this.formData).subscribe((response) => {
            this.newProduct.product_url = response.url;
            console.log('Arquivo enviado com sucesso!', response);
          });
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  }

  saveProduct(): Observable<Item> {
    return this.productService.createProduct(this.newProduct);
  }
}
