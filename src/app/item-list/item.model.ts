export class Item {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  product_url: string;
  quantity: number;
  quantityCart: number;
  editingName: boolean;
  editingDescription: boolean;
  editingUnitPrice: boolean;

  constructor(id: string, name: string, description: string, unit_price: number, imageUrl: string, quantity: number, quantityCart: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.unit_price = unit_price;
    this.product_url = imageUrl;
    this.quantity = quantity;
    this.quantityCart = quantityCart;
    this.editingName = false;
    this.editingDescription = false;
    this.editingUnitPrice = false;
  }
}
