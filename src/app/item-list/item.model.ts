// item.model.ts
export class Item {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  imageUrl: string;
  quantity: number;
  quantityCart: number;

  constructor(id: string, name: string, description: string, unit_price: number, imageUrl: string, quantity: number, quantityCart: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.unit_price = unit_price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
    this.quantityCart = quantityCart;
  }
}
