package org.test.sms.server.service.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.test.sms.common.entities.ActionLog;
import org.test.sms.common.enums.ActionType;
import org.test.sms.common.exception.AppException;
import org.test.sms.common.filters.AbstractFilter;
import org.test.sms.common.service.common.ActionLogService;
import org.test.sms.server.dao.interfaces.common.ActionLogDao;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ActionLogServiceImpl implements ActionLogService {

    private ActionLogDao dao;

    @Autowired
    public ActionLogServiceImpl(ActionLogDao dao) {
        this.dao = dao;
    }

    @Override
    public ActionLog add(ActionLog entity) throws AppException {
        return dao.add(entity);
    }

    @Override
    public ActionLog update(ActionLog entity) throws AppException {
        return dao.update(entity);
    }

    @Override
    public void delete(long id) throws AppException {
        dao.delete(id);
    }

    @Override
    public Optional<ActionLog> get(long id) {
        return dao.get(id);
    }

    @Override
    public List<ActionLog> getList(AbstractFilter filter) {
        return dao.getList(filter);
    }

    @Override
    public ActionLog add(ActionType type, String info, String username, String ipAddress) throws AppException {
        return dao.add(type, info, username, ipAddress);
    }
}