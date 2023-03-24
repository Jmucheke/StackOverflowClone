import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url !== 'http://localhost:4000/users/login' && 'http://localhost:4000/users/register') {
      const token = localStorage.getItem('token') as string
      let modifiedReq = req.clone({ headers: new HttpHeaders().append('token', token).append('Custom', 'Just see Me') })
      return next.handle(modifiedReq)
    }
    return next.handle(req)
  }
}

// import { exhaustMap, take } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpEvent,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { getToken } from 'src/app/auth/state/selectors/auth.selectors';

// @Injectable()
// export class TokenInterceptorService implements HttpInterceptor {
//   constructor(private store: Store<AppState>) { }
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // const token = localStorage.getItem('token') as string
//     return this.store.select(getToken).pipe(
//       take(1),
//       exhaustMap((token) => {
//         if (!token) {
//           return next.handle(req);
//         }
//         let modifiedReq = req.clone({
//           params: req.params.append('auth', token),
//         });
//         return next.handle(modifiedReq);
//       })
//     );
//   }
// }
