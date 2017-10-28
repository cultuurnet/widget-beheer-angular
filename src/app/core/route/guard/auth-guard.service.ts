import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs/Observable";

/**
 * Authguard service
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * AuthGuard constructor
   * @param userService
   */
  constructor(private userService: UserService) {
  }

  /**
   * @inheritDoc
   */
  canActivate() {
      return this.userService.getUser().map(() => {
          return true;
      }, () => {
          window.location.href = environment.projectaanvraagDashboardUrl;
      }).catch(error => {
          window.location.href = environment.projectaanvraagDashboardUrl;
          return Observable.of(false);
      });
  }

}
