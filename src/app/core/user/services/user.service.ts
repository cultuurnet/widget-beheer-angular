import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { MemoryCache } from '../../memory-cache';

/**
 * Service that handles request to the "user" api
 */
@Injectable()
export class UserService {
  /**
   * The user API path
   * @type {string}
   */
  private apiPath = 'uitid/';

  private lastLoaded;

  /**
   * ProjectService constructor.
   * @param http
   * @param cache
   */
  constructor(private http: HttpClient, private cache: MemoryCache) {}

  /**
   * Checks if the user is logged in
   */
  public isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(
      map(
        () => {
          return true;
        },
        () => {
          return false;
        }
      ),
      catchError((error) => {
        return observableOf(false);
      })
    );
  }

  /**
   * Get the current user
   * @return {Observable<User>}
   */
  public getUser(): Observable<User> {
    // Don't keep the user forever in cache. Check every 5 minutes if he is still really logged in.
    if (this.lastLoaded) {
      const currentDate = new Date();
      const difference = currentDate.getTime() - this.lastLoaded.getTime();

      // Refresh user every 5 minutes.
      if (Math.round(difference / 60000) > 5) {
        this.cache.clear('currentUser');
      }
    }

    const cachedUser = this.cache.get('currentUser', ['user'], false);

    if (cachedUser) {
      return observableOf(cachedUser);
    }

    return this.http.get(environment.apiUrl + this.apiPath + 'user').pipe(
      map((user) => new User(user)),
      tap((user) => {
        this.lastLoaded = new Date();
        // Cache the response
        this.cache.put('currentUser', ['user'], user);
      })
    );
  }

  /**
   * Logout the current user
   * @return {Observable<unknown>}
   */
  public logout() {
    return this.http.get(environment.apiUrl + this.apiPath + 'logout').pipe(
      tap(() => {
        // Remove the user from the cache
        this.cache.clear('currentUser');
      })
    );
  }
}
