package org.test.sms.server.dao.impl.university;

import org.springframework.stereotype.Repository;
import org.test.sms.common.entities.university.StudentCourse;
import org.test.sms.server.dao.impl.AbstractDaoImpl;
import org.test.sms.server.dao.interfaces.university.StudentCourseDao;

@Repository
public class StudentCourseDaoImpl extends AbstractDaoImpl<StudentCourse> implements StudentCourseDao {
}