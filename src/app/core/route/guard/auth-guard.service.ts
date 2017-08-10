import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../../user/services/user.service';

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
    return this.userService.isLoggedIn();
  }

}
