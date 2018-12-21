// angular > core
import {Inject, Injectable} from '@angular/core';
// angular > http
import {HttpClient} from '@angular/common/http';
// model > entity
import {UserGroup} from '../model/dto/user-group';
// model > filter
import {UserGroupFilter} from '../model/filter/user-group-filter';
// model > enum
import {HttpRequestType} from '../model/type/http-request-type.enum';
// service
import {AbstractService} from './abstract-service';
// util
import {USER_GROUP_SERVICE_URL} from '../util/static/injectable-constants';
// rxjs
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class UserGroupService extends AbstractService<UserGroup> {

	public constructor(http: HttpClient, @Inject(USER_GROUP_SERVICE_URL) serviceUrl: string) {
		super(http, serviceUrl);
	}

	public add(entity: UserGroup): Observable<UserGroup> {
		return super.httpRequest(HttpRequestType.POST, 'add', entity);
	}

	public update(entity: UserGroup): Observable<UserGroup> {
		return super.httpRequest(HttpRequestType.POST, 'update', entity);
	}

	public delete(id: number): Observable<void> {
		return super.httpRequest(HttpRequestType.DELETE, `delete/${id}`);
	}

	public get(id: number): Observable<UserGroup> {
		return super.httpRequest(HttpRequestType.GET, `get/${id}`);
	}

	public getCount(filter: UserGroupFilter): Observable<number> {
		return super.httpRequest(HttpRequestType.POST, 'getCount', filter);
	}

	public getList(filter: UserGroupFilter): Observable<UserGroup[]> {
		return super.httpRequest(HttpRequestType.POST, 'getList', filter);
	}

	// misc

	public getListForSelection(): Observable<UserGroup[]> {
		return super.httpRequest(HttpRequestType.GET, `getListForSelection`);
	}
}