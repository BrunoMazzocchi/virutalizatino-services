const mysqlClient = require("../config/db/databaseConnection");
const CourseModel = require("../models/courseModel");
const UserCourseModel = require("../models/userCourseModel");

async function getCoursesByUserId(userId) {
  try {
    const query = `
    SELECT c.course_id, c.title, c.description, c.state, c.created_at, c.last_updated
    FROM courses AS c
    INNER JOIN user_course AS uc ON c.course_id = uc.course_id
    LEFT JOIN removed_course AS rc ON rc.user_course_id = uc.id
    WHERE uc.user_id = ${userId}
    AND rc.user_course_id IS NULL;
    `;

    const result = await new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    // Mapping result to CourseModel objects
    const courses = result.map((course) => {
      return new CourseModel(
        course.course_id,
        course.title,
        course.description,
        course.state,
        course.created_at,
        course.last_updated
      );
    });

    return courses;
  } catch (error) {
    throw error;
  }
}

async function removeCourse(userId, courseId) {
  try {
    const query = `INSERT INTO removed_course (user_course_id)
    SELECT uc.id
    FROM user_course AS uc
    LEFT JOIN courses c 
    on c.course_id = uc.course_id
    WHERE uc.course_id = ${courseId}
    and uc.user_id = ${userId};`;

    const result = await new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { getCoursesByUserId, removeCourse };
