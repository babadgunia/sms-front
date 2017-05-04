package org.test.sms.server.service.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.test.sms.common.entities.UserGroup;
import org.test.sms.common.exception.AppException;
import org.test.sms.common.filters.AbstractFilter;
import org.test.sms.common.service.common.UserGroupService;
import org.test.sms.server.dao.interfaces.common.UserGroupDao;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserGroupServiceImpl implements UserGroupService {

    private UserGroupDao dao;

    @Autowired
    public UserGroupServiceImpl(UserGroupDao dao) {
        this.dao = dao;
    }

    @Override
    public UserGroup add(UserGroup entity) throws AppException {
        return dao.add(entity);
    }

    @Override
    public UserGroup update(UserGroup entity) throws AppException {
        return dao.update(entity);
    }

    @Override
    public void delete(long id) throws AppException {
        dao.delete(id);
    }

    @Override
    public Optional<UserGroup> get(long id) {
        return dao.get(id);
    }

    @Override
    public List<UserGroup> getList(AbstractFilter filter) {
        return dao.getList(filter);
    }
}