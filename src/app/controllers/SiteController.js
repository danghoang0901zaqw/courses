const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class SiteController {
  async index(req, res, next) {
    try {
      const courses = await Course.find({});
      return res.render("home", {
        courses: multipleMongooseToObject(courses),
      });
    } catch (err) {
      next(err);
      res.status(500).json({ msg: "ERROR" });
    }
    // res.render("home");
  }
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
