import {environment} from '../../../environments/environment';

const API_BASE_URL: string = environment.host + 'api/';
export const AUTH_SERVICE_URL: string = 'AUTH_SERVICE_URL';
export const TEXT_SERVICE_URL: string = 'TEXT_SERVICE_URL';
export const USER_GROUP_SERVICE_URL: string = 'USER_GROUP_SERVICE_URL';
export const USER_SERVICE_URL: string = 'USER_SERVICE_URL';

export const INJECTABLE_CONSTANTS: any[] = [
	{provide: AUTH_SERVICE_URL, useValue: API_BASE_URL + 'auth'},
	{provide: TEXT_SERVICE_URL, useValue: API_BASE_URL + 'text'},
	{provide: USER_GROUP_SERVICE_URL, useValue: API_BASE_URL + 'userGroup'},
	{provide: USER_SERVICE_URL, useValue: API_BASE_URL + 'user'}
];