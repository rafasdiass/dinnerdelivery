// cart-item.model.ts
import { Item } from './item.model';

export class Cart {
  id: string;
  id_users: string | null;
  products: Array<Item>;
  subtotal: number;

  constructor(
    id: string,
    id_users: string | null,
    products: Array<Item>,
    subtotal: number
  ) {
    this.id = id;
    this.id_users = id_users
    this.products = products;
    this.subtotal = subtotal;
  }
}
