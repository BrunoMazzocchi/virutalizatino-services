const courseService = require("../services/courseService");

async function getCoursesByUserId(req, res) {
  const userId = req.headers["x-user-id"];
  try {
    const courses = await courseService.getCoursesByUserId(userId);

    res.status(200).json({ message: "Courses fetched successfully", courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
}

async function removeCourse(req, res) {
  const userId = req.headers["x-user-id"];
  const courseId = req.params.courseId;

  try {
    await courseService.removeCourse(userId, courseId);

    res.status(200).json({ message: "Course removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing course", error: error.message });
  }
}

module.exports = { getCoursesByUserId, removeCourse };
