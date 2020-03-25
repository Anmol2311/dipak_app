import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  canActivate(): boolean {
    if (!!sessionStorage.getItem('tokenId')) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.notificationService.warn(':: Access Denied');
      return false;
    }
  }

}
