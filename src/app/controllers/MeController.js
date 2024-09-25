const { multipleMongooseToObject } = require("../../utils/mongoose");
const Course = require("../models/Course");

class MeController {
  async storeCourses(req, res, next) {
    try {
      const courses = await Course.find({});
      return res.render("me/stored-courses", {
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
