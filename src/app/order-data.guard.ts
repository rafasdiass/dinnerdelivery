import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TempStorageService } from './temp-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDataGuard implements CanActivate {
  constructor(private tempStorageService: TempStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const orderData = this.tempStorageService.getOrderData();
    if (orderData) {
      return true;
    } else {
      this.router.navigate(['/']); // Redireciona para a página inicial se os dados do pedido não estiverem disponíveis
      return false;
    }
  }
}
