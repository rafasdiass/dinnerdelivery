// item.model.ts
export class Item {
  id: number;
  name: string;
  description: string;
  unit_price: number;
  imageUrl: string;
  quantity: number;

  constructor(id: number, name: string, description: string, unit_price: number, imageUrl: string, quantity: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.unit_price = unit_price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }
}
