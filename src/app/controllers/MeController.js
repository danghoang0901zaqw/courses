const { multipleMongooseToObject } = require("../../utils/mongoose");
const Course = require("../models/Course");

class MeController {
  async storeCourses(req, res, next) {
    try {
      let CourseQuery = Course.find({});
      if (req.query.hasOwnProperty("_sort")) {
        CourseQuery = CourseQuery.sort({ [req.query.column]: req.query.type });
      }
      const [courses, deletedCount] = await Promise.all([
        CourseQuery,
        Course.countDocumentsWithDeleted({ deleted: true }),
      ]);
      // console.log(courses);
      return res.render("me/stored-courses", {
        deletedCount,
        courses: multipleMongooseToObject(courses),
      });
    } catch (error) {
      next(error);
    }
  }
  async trashCourses(req, res, next) {
    try {
      const courses = await Course.findWithDeleted({ deleted: true });
      return res.render("me/trash-courses", {
        courses: multipleMongooseToObject(courses),
      });
    } catch (error) {
      next(error);
    }
  }
  update(req, res, next) {}
}
module.exports = new MeController();
