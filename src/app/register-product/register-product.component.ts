import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Item } from '../item-list/item.model';
import { HttpEventType } from '@angular/common/http';

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

  createProduct(): void {
    if (
      this.newProduct.name &&
      this.newProduct.description &&
      this.newProduct.unit_price
    ) {
      this.productService
        .createProduct(this.newProduct)
        .subscribe((response) => {
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
          this.onUpload(response.id);
        });
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload(id: string) {
    const fd = new FormData();
    if (this.selectedFile) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.uploadImage(fd, id).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round((100 * event.loaded) / event.total);
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    });
  }
}
