// model > enum
import {PermissionGroupType} from '../../model/type/permission-group-type.enum';
import {PermissionType} from '../../model/type/permission-type.enum';

export interface SystemPermission {

	group: PermissionGroupType,

	types: PermissionType[]
}