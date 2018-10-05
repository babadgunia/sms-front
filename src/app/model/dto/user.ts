// model > entity
import {AbstractDto} from './abstract-dto';
import {UserGroup} from './user-group';

export class User extends AbstractDto {

	id: number;

	username: string;

	email: string;

	name: string;

	status: string;

	language: string;

	userGroup: UserGroup;
}