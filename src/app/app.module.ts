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
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';
// import { FileUploadModule } from 'ng2-file-upload';
// import { NgxFileDropModule } from 'ngx-file-drop';



// Importações do angularx-social-login
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { RegisterProductComponent } from './register-product/register-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListRegisteredProductsComponent } from './list-registered-products/list-registered-products.component';

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
    RegisterProductComponent,
    NavbarComponent,
    ListRegisteredProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    SocialLoginModule,
    // FileUploadModule,
    // NgxFileDropModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ProductService,
    OrderService,
    CartService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
