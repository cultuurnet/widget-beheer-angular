import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from "rxjs";
import * as URI from "urijs";
import { environment } from "../../environments/environment";

/**
 * Intercepts every request and injects common headers.
 */
@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

  /**
   * @inheritDoc
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestURI = URI(req.url);
    const apiURI = URI(environment.apiUrl);

    // Only act on widget API requests
    if (requestURI.host() === apiURI.host()) {
      const credReq = req.clone({withCredentials: true});
      return next.handle(credReq);
    }

    return next.handle(req);
  }

}
