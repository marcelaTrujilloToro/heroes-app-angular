import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  UrlSegment,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
}

// export const canActivateGuard: CanActivateFn = (
//   //Hay que tener en cuenta el tipado CanActiveFn
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   console.log('CanActivate');
//   console.log({ route, state });

//   return false;
// };

// export const canMatchGuard: CanMatchFn = (
//   //Tipado CanMatchFN
//   route: Route,
//   segments: UrlSegment[]
// ) => {
//   console.log('CanMatch');
//   console.log({ route, segments });

//   return false;
// };
