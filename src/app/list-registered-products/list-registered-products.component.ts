import { Component, OnInit } from '@angular/core';
import { Item } from '../item-list/item.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-registered-products',
  templateUrl: './list-registered-products.component.html',
  styleUrls: ['./list-registered-products.component.css']
})
export class ListRegisteredProductsComponent implements OnInit {
  items: Item[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.productService.getProducts().subscribe((products) => {
      if (products.length > 0) {
        this.items = products;
      }
    });
  }

  enableEditing(item: Item): void {
      item.editingName = !item.editingName;
      item.editingDescription = !item.editingDescription;
      item.editingUnitPrice = !item.editingUnitPrice;
  }

  updateProduct(item: Item): void {

    // this.productService.updateProduct(item.id, item).subscribe(() => {
      console.log('Produto atualizado!');
      console.log(item)
      item.editingName = false;
      item.editingDescription = false;
      item.editingUnitPrice = false;

    // });
  }

  deleteProduct(item: Item): void {
    const index = this.items.findIndex(product => item.id === product.id);
    console.log(index)
    if (confirm(`Tem certeza que deseja excluir este produto?`)){
      this.items.splice(index, 1)
      console.log(this.items)
      this.productService.deleteProduct(item.id).subscribe(() => {
        console.log('Produto deletado');
        this.items = this.items.filter(i => i.id !== item.id);
      });

    }
  }
}
