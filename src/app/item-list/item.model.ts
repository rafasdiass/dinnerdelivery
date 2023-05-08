export class Item {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  imageUrl: string;
  quantity: number;
  quantityCart: number;
<<<<<<< HEAD
  editingName: boolean;
  editingDescription: boolean;
  editingUnitPrice: boolean;
=======
>>>>>>> 7bfb2c77bc428d33ca7c38f3f3c2e859df49e31e

  constructor(id: string, name: string, description: string, unit_price: number, imageUrl: string, quantity: number, quantityCart: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.unit_price = unit_price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
    this.quantityCart = quantityCart;
<<<<<<< HEAD
    this.editingName = false;
    this.editingDescription = false;
    this.editingUnitPrice = false;
=======
>>>>>>> 7bfb2c77bc428d33ca7c38f3f3c2e859df49e31e
  }
}
