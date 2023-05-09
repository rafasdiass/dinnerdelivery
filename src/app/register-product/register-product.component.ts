import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Item } from '../item-list/item.model';
import { HttpEventType } from '@angular/common/http';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { api } from 'src/app/api';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

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

  public uploader: FileUploader = new FileUploader({
    url: '',
    itemAlias: 'image',
    method: 'PATCH',
  });

  createProduct(): void {
    if (
      this.newProduct.name &&
      this.newProduct.description &&
      this.newProduct.unit_price
    ) {
      this.productService
        .createProduct(this.newProduct)
        .subscribe((response) => {
          console.log(response);
          console.log('Produto criado com sucesso!');
          this.newProduct = {
            id: '',
            name: '',
            description: '',
            unit_price: 0,
            quantity: 0,
            quantityCart: 0,
            editingName: false,
            editingDescription: false,
            editingUnitPrice: false,
          };
          // this.uploader.onBeforeUploadItem = (item) => {
          //   item.url = `${api.url}/products/import/${response.id}`; // concatenar o valor do id na url
          // };
          // this.uploader.uploadAll();
          this.onUpload(response.id);
        });
    } else {
      alert('Preencha todos os campos obrigatórios');
    }
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('image', file, file.name);

    console.log(this.formData); // verifique se o arquivo está presente no FormData
  }

  onUpload(id: string) {
    console.log(this.formData.get('image')); // verifique se o arquivo está presente no FormData

    this.productService.uploadImage(this.formData, id).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone =
          event.total != null
            ? Math.round((100 * event.loaded) / event.total)
            : 0;

        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    });
  }
}
