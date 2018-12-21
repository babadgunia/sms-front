// angular
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
// util
import {HTTP_STATUSES} from '../static/http-statuses';
// rxjs
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	public constructor(private router: Router) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(catchError(
			(error: any) => {
				if (error.status === HTTP_STATUSES.UNAUTHORIZED.code) {
					this.router.navigate(['/forbidden']);
				}

				return throwError(error);
			}
		));
	}
}