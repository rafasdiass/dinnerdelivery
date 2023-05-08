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

  enableEditing(item: Item, field: string): void {
    if (field === 'name') {
      item.editingName = true;
    } else if (field === 'description') {
      item.editingDescription = true;
    } else if (field === 'unit_price') {
      item.editingUnitPrice = true;
    }
  }

  updateProduct(item: Item): void {
    this.productService.updateProduct(item.id, item).subscribe(() => {
      console.log('Produto atualizado');
      item.editingName = false;
      item.editingDescription = false;
      item.editingUnitPrice = false;
    });
  }
}
