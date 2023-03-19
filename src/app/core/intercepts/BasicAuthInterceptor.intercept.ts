import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  private username = 'elastic';
  private password = 'DvTMnr0pDy-e7EcanLgr';
  private credentials = `${this.username}:${this.password}`;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: new HttpHeaders().set('Authorization', `Basic ${btoa(this.credentials)}`)
    });
    return next.handle(authReq);
  }
}
