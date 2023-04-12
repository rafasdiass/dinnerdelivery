import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    CartComponent,
    ShippingFormComponent,
    PaymentFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule], // Adiciona FormsModule
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
