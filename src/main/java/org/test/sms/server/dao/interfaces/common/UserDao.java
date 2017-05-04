package org.test.sms.server.dao.interfaces.common;

import org.test.sms.common.entities.User;
import org.test.sms.server.dao.AbstractDao;

import java.util.Optional;

public interface UserDao extends AbstractDao<User> {

    Optional<User> get(String username);

    boolean exists(long userGroupId);
}