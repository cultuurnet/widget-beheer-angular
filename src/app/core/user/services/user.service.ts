import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { StaticCache } from "../../static-cache";
import { User } from "../user";

/**
 * Service that handles request to the "user" api
 */
@Injectable()
export class UserService {

  /**
   * ProjectService constructor.
   * @param http
   * @param cache
   */
  constructor (private http: HttpClient, private cache: StaticCache) {
  }

  /**
   * Get the current user
   * @return {Observable<Object>}
   */
  public getUser() {
    const user = this.cache.get('currentUser', ['user'], false);

    if (user) {
      return Observable.of(user);
    }

    return this.http.get(environment.apiUrl + 'uitid/user')
      .map(user => new User(user))
      .do(user => {
        // Cache the response
        this.cache.put('currentUser', ['user'], user);
      });
  }

}
