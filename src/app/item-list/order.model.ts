import { Item } from './item.model';

export class Order {
  constructor(
    public name: string = '',
    public email: string = '',
    public address: string = '',
    public city: string = '',
    public state: string = '',
    public zip: string = '',
    public cardNumber: string = '',
    public cardExpiration: string = '',
    public cardSecurityCode: string = '',
    public items: CartItem[] = [],
    public total: number = 0
  ) {}

  addItem(item: Item, quantity: number): void {
    let cartItem = new CartItem(item, quantity);
    this.items.push(cartItem);
  }

  calculateTotalPrice(): void {
    let totalPrice = 0;
    for (let cartItem of this.items) {
      totalPrice += cartItem.getTotalPrice();
    }
    this.total = totalPrice;
  }
}

export class CartItem {
  item: Item;
  quantity: number;

  constructor(item: Item, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }

  getTotalPrice(): number {
    return this.item.unit_price * this.quantity;
  }
}
 