const { mongooseToObject } = require("../../utils/mongoose");
const Courses = require("../models/Course");
class CoursesController {
  async show(req, res, next) {
    const slug = req.params.slug;
    try {
      const course = await Courses.findOne({ slug });
      return res.render("courses/show", {
        course: mongooseToObject(course),
      });
    } catch (error) {
      next(error);
    }
  }
  create(req, res, next) {
    return res.render("courses/create");
  }
  async edit(req, res, next) {
    try {
      const courseId = req.params.id;
      const course = await Courses.findById(courseId);
      return res.render("courses/edit", { course: mongooseToObject(course) });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const formData = req.body;
      const courseId = req.params.id;
      await Courses.updateOne({ _id: courseId }, formData);
      return res.redirect("/me/stored/courses");
    } catch (error) {
      next(error);
    }
  }
  async restore(req, res, next) {
    try {
      const courseId = req.params.id;
      await Courses.restore({ _id: courseId });
      return res.redirect("back");
    } catch (error) {
      next(error);
    }
  }
  async destroy(req,res,next){
    try {
      const courseId = req.params.id;
      await Courses.delete({ _id: courseId });
      return res.redirect("back");
    } catch (error) {
      next(error);
    }
  }
  async forceDestroy(req,res,next){
    try {
      const courseId = req.params.id;
      await Courses.deleteOne({ _id: courseId });
      return res.redirect("back");
    } catch (error) {
      next(error);
    }
  }
  async store(req, res, next) {
    try {
      req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
      // const course = new Courses(formData);
      // await course.save();
      await Courses.create(req.body);
      res.redirect("/");
    } catch (error) {
      next(err);
    }
  }
}

module.exports = new CoursesController();
