import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  canActivate(): boolean {
    if (!!sessionStorage.getItem('adminTokenId')) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.notificationService.warn(':: Access Denied');
      return false;
    }
  }
}
