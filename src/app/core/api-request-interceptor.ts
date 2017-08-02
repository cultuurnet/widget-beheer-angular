import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from "rxjs";

/**
 * Intercepts every request and injects common headers.
 */
@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @todo: Only act on API requests
    let credReq = req.clone({withCredentials: true});
    return next.handle(credReq);
  }
}