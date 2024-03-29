import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { environment } from '../../../../environments/environment';

/**
 * Authguard service
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * AuthGuard constructor
   * @param userService
   */
  constructor(private userService: UserService) {}

  /**
   * @inheritDoc
   */
  canActivate() {
    return this.userService.getUser().pipe(
      map(
        () => {
          return true;
        },
        () => {
          window.location.href = environment.platformIsLive
            ? environment.platformUrl
            : environment.projectaanvraagDashboardUrl;
        }
      ),
      catchError((error) => {
        window.location.href = environment.platformIsLive
          ? environment.platformUrl
          : environment.projectaanvraagDashboardUrl;
        return observableOf(false);
      })
    );
  }
}
