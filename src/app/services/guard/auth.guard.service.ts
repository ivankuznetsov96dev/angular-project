import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((value) => !!value),
      tap((isLogged) => {
        if (!isLogged) {
          this.router.navigate(['/login']).then((r) => {
            console.log('You are not authorized');
            setTimeout(() => alert('You are not authorized'), 1000);
          });
        }
      }),
    );
  }
}
