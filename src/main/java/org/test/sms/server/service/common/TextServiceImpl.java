package org.test.sms.server.service.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.test.sms.common.entities.Text;
import org.test.sms.common.exception.AppException;
import org.test.sms.common.filters.AbstractFilter;
import org.test.sms.common.service.common.TextService;
import org.test.sms.server.dao.interfaces.common.TextDao;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TextServiceImpl implements TextService {

    private TextDao dao;

    @Autowired
    public TextServiceImpl(TextDao dao) {
        this.dao = dao;
    }

    @Override
    public Text add(Text entity) throws AppException {
        return dao.add(entity);
    }

    @Override
    public Text update(Text entity) throws AppException {
        return dao.update(entity);
    }

    @Override
    public void delete(long id) throws AppException {
        dao.delete(id);
    }

    @Override
    public Optional<Text> get(long id) {
        return dao.get(id);
    }

    @Override
    public List<Text> getList(AbstractFilter filter) {
        return dao.getList(filter);
    }
}