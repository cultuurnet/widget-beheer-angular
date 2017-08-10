import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { User } from "../user";
import { MemoryCache } from "../../memory-cache";

/**
 * Service that handles request to the "user" api
 */
@Injectable()
export class UserService {

  /**
   * The user API path
   * @type {string}
   */
  private apiPath: string = 'uitid/';

  /**
   * ProjectService constructor.
   * @param http
   * @param cache
   */
  constructor (private http: HttpClient, private cache: MemoryCache) {
  }

  /**
   * Checks if the user is logged in
   */
  public isLoggedIn(): Observable<boolean> {
    return this.getUser().map(() => {
      return true;
    }, () => {
      return false;
    });
  }

  /**
   * Get the current user
   * @return {Observable<User>}
   */
  public getUser(): Observable<User> {
    const user = this.cache.get('currentUser', ['user'], false);

    if (user) {
      return Observable.of(user);
    }

    return this.http.get(environment.apiUrl + this.apiPath + 'user')
      .map(user => new User(user))
      .do(user => {
        // Cache the response
        this.cache.put('currentUser', ['user'], user);
      });
  }

  /**
   * Logout the current user
   * @return {Observable<Object>}
   */
  public logout() {
    return this.http.get(environment.apiUrl + this.apiPath + 'logout')
      .do(() => {
        // Remove the user from the cache
        this.cache.clear('currentUser');
      });
  }

}
