// model > entity
import {AbstractDto} from './abstract-dto';

export class Permission extends AbstractDto {

	id: number;

	permissionGroup: string;

	permissionTypes: string[];
}