package org.test.sms.server.dao.impl.university;

import org.springframework.stereotype.Repository;
import org.test.sms.common.entities.university.Building;
import org.test.sms.common.entities.university.Course;
import org.test.sms.common.entities.university.Exam;
import org.test.sms.common.entities.university.Faculty;
import org.test.sms.common.enums.university.ExamType;
import org.test.sms.common.filters.AbstractFilter;
import org.test.sms.common.filters.ExamFilter;
import org.test.sms.server.dao.impl.AbstractDaoImpl;
import org.test.sms.server.dao.interfaces.university.ExamDao;

import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public class ExamDaoImpl extends AbstractDaoImpl<Exam> implements ExamDao {

    @Override
    public List<Exam> getList(AbstractFilter filter) {
        StringBuilder queryBuilder = new StringBuilder("FROM Exam WHERE 1 = 1");
        Map<String, Object> params = new HashMap<>();

        addFilter(queryBuilder, params, (ExamFilter) filter);

        queryBuilder.append(" ORDER BY startDate ASC");

        TypedQuery<Exam> query = em.createQuery(queryBuilder.toString(), Exam.class);
        params.keySet().forEach(e -> query.setParameter(e, params.get(e)));

        return query.getResultList();
    }

    private void addFilter(StringBuilder queryBuilder, Map<String, Object> params, ExamFilter filter) {
        if (Objects.isNull(filter)) {
            return;
        }

        Faculty faculty = filter.getFaculty();
        if (Objects.nonNull(faculty)) {
            queryBuilder.append(" AND course.faculty = :faculty");
            params.put("faculty", faculty);
        }

        Course course = filter.getCourse();
        if (Objects.nonNull(course)) {
            queryBuilder.append(" AND course = :course");
            params.put("course", course);
        }

        LocalDateTime from = filter.getFromDate();
        if (Objects.nonNull(from)) {
            queryBuilder.append(" AND startDate >= :from");
            params.put("from", from);
        }

        LocalDateTime to = filter.getToDate();
        if (Objects.nonNull(to)) {
            queryBuilder.append(" AND startDate <= :to");
            params.put("to", to);
        }

        Building building = filter.getBuilding();
        if (Objects.nonNull(building)) {
            queryBuilder.append(" AND building = :building");
            params.put("building", building);
        }

        ExamType type = filter.getType();
        if (Objects.nonNull(type)) {
            queryBuilder.append(" AND type = :type");
            params.put("type", type);
        }
    }
}