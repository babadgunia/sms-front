package org.test.sms.common.service.common;

import org.test.sms.common.entities.ActionLog;
import org.test.sms.common.enums.ActionType;
import org.test.sms.common.exception.AppException;
import org.test.sms.common.service.AbstractService;

public interface ActionLogService extends AbstractService<ActionLog> {

    ActionLog add(ActionType type, String info, String username, String ipAddress) throws AppException;
}