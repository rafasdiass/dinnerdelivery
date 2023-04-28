// Importação dos módulos necessários do Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importação dos componentes da aplicação
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; // Verifique se o caminho está correto
import { OrderSummaryComponent } from './order-summary/order-summary.component'; // Importação do componente OrderSummaryComponent
//import { OrderDataGuard } from './order-data.guard'; // Importação do "guard" OrderDataGuard

// Definição das rotas da aplicação
const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Rota para o componente HomeComponent
  { path: '', component: ItemListComponent }, // Rota padrão para o componente ItemListComponent
  { path: 'carrinho', component: CartComponent }, // Rota para o componente CartComponent
  { path: 'shipping', component: ShippingFormComponent }, // Rota para o componente ShippingFormComponent
  { path: 'payment', component: PaymentFormComponent }, // Rota para o componente PaymentFormComponent
  { path: 'login', component: LoginComponent }, // Rota para o componente LoginComponent
  { path: 'forgot-password', component: ForgotPasswordComponent }, // Rota para o componente ForgotPasswordComponent
  { path: 'order-summary', component: OrderSummaryComponent }, // canActivate: [OrderDataGuard] }, // Rota para o componente OrderSummaryComponent com o "guard" aplicado
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para a tela de login caso a rota não seja encontrada
];

// Declaração do módulo AppRoutingModule
@NgModule({
  exports: [RouterModule], // Exporta RouterModule para que outros módulos possam utilizá-lo
  imports: [RouterModule.forRoot(routes)] // Importa RouterModule com as rotas definidas
})
export class AppRoutingModule { } // Classe AppRoutingModule
