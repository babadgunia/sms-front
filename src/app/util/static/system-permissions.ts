// model > enum
import {PermissionGroupType} from '../../model/type/permission-group-type.enum';
import {PermissionType} from '../../model/type/permission-type.enum';
// util
import {SystemPermission} from './system-permission';

export const SYSTEM_PERMISSIONS: SystemPermission[] = [
	{
		group: PermissionGroupType.TEXT,
		types: [PermissionType.ADD, PermissionType.DELETE, PermissionType.EDIT, PermissionType.VIEW]
	},
	{
		group: PermissionGroupType.USER,
		types: [PermissionType.ADD, PermissionType.DELETE, PermissionType.EDIT, PermissionType.RESET_PASSWORD, PermissionType.VIEW]
	},

	{
		group: PermissionGroupType.USER_GROUP,
		types: [PermissionType.ADD, PermissionType.DELETE, PermissionType.EDIT, PermissionType.VIEW]
	}
];