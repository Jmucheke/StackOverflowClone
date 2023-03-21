// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Store, select } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { isLoggedIn } from 'src/app/auth/state/selectors/auth.selectors';
// import { AppState } from '../../store/app.state';
// import { AuthService } from '../auth/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class GuardService implements CanActivate {

//   constructor(private store: Store<AppState>) { }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.store.pipe(select(isLoggedIn));
//   }

//   // constructor(private router: Router, private authService: AuthService) { }

//   // canActivate(): boolean {
//   //   if (this.authService.isAuthenticated()) {
//   //     return true;
//   //   } else {
//   //     this.router.navigate(['/login']);
//   //     return false;
//   //   }
//   // }

//   // canActivate(
//   //   route: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   //   return this.authService.getAuthStatus().then((status: boolean) => {
//   //     if (status) {
//   //       return true
//   //     } else {
//   //       alert("please login to continue")
//   //       this.router.navigate(['login'])
//   //       return false
//   //     }
//   //   })
//   // }
// }
