// angular > http
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// model > enum
import {HttpRequestType} from '../model/type/http-request-type.enum';
// util
import {AuthUtils} from '../util/auth-utils';
// rxjs
import {Observable} from 'rxjs/internal/Observable';

export abstract class AbstractService<T> {

	protected constructor(private http: HttpClient, private serviceUrl: string) {}

	// makes an http request
	protected httpRequest(requestType: HttpRequestType, url: string, body?: any, options?: { headers?: HttpHeaders, params?: HttpParams | { [param: string]: string; } }):
		Observable<any> {
		url = this.serviceUrl + '/' + url;
		options.headers = options.headers ? options.headers : AuthUtils.getApiHeaders();

		switch (requestType) {
			case HttpRequestType.DELETE: {
				return this.http.delete<void>(url, options);
			}
			case HttpRequestType.GET: {
				return this.http.get<T>(url, options);
			}
			case HttpRequestType.PATCH: {
				return this.http.patch<T>(url, body, options);
			}
			case HttpRequestType.POST: {
				return this.http.post<T>(url, body, options);
			}
			case HttpRequestType.PUT: {
				return this.http.put<T>(url, body, options);
			}
		}
	}
}