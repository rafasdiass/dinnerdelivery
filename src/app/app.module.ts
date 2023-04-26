import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ItemListComponent } from '../app/item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './auth.interceptor';

// Importe o OrderService aqui
import { OrderService } from './order.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    CartComponent,
    ShippingFormComponent,
    PaymentFormComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // Adicione o OrderService aos providers
    OrderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
