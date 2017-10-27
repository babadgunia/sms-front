package org.test.sms.server.dao.impl.general;

import org.springframework.stereotype.Repository;
import org.test.sms.common.entity.general.I18NText;
import org.test.sms.common.entity.general.Text;
import org.test.sms.common.filter.general.AbstractFilter;
import org.test.sms.common.filter.general.TextFilter;
import org.test.sms.common.utils.Utils;
import org.test.sms.server.dao.interfaces.general.TextDao;

import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public class TextDaoImpl extends AbstractDaoImpl<Text> implements TextDao {

    @Override
    protected void initSubEntities(Text entity, LocalDateTime now) {
        entity.getValues().forEach(value -> {
            value.setCreationTime(now);
            value.setLastModifiedTime(now);
        });
    }

    @Override
    protected Text init(Text entity) {
        List<I18NText> values = entity.getValues();
        values.size();

        return entity;
    }

    @Override
    protected String getSelect() {
        return "id, key";
    }

    @Override
    protected void addFilter(StringBuilder queryBuilder, Map<String, Object> params, AbstractFilter abstractFilter) {
        TextFilter filter = (TextFilter) abstractFilter;

        String key = filter.getKey();
        if (Objects.nonNull(key)) {
            queryBuilder.append(" AND key = :key");
            params.put("key", key.toUpperCase());
        }
//        TODO add value filter
    }

    @Override
    protected String getOrderBy() {
        return "key";
    }

    @Override
    public boolean exists(String key) {
        TypedQuery<Text> query = em.createQuery("SELECT new Text(id) FROM Text WHERE (key) = :key", Text.class);
        query.setParameter("key", key.toUpperCase());

        return !Utils.isBlank(query.getResultList());
    }

    @Override
    public List<Text> getListForSelection() {
        return em.createQuery("SELECT new Text(id, key) FROM Text ORDER BY key", Text.class).getResultList();
    }
}