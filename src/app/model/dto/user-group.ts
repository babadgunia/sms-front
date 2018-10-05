// model > entity
import {AbstractDto} from './abstract-dto';
import {Permission} from './permission';

export class UserGroup extends AbstractDto {

	id: number;

	name: string;

	permissions: Permission[] = [];
}