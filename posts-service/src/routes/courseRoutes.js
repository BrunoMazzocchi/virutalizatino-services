const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: Courses fetched successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Courses not found
 *       500:
 *         description: Internal server error
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token for authentication
 *         required: true
 *         schema:
 *           type: string
 */

router.get("/courses", courseController.getCoursesByUserId);

router.post("/courses/:courseId/remove", courseController.removeCourse);

module.exports = router;
