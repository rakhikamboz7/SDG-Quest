const express = require("express");
const { getAllQuizzes, getQuestionsByGoalId } = require("../controllers/quizController");

const router = express.Router();

router.get("/", getAllQuizzes);
router.get("/:goalId", getQuestionsByGoalId); 

module.exports = router;













