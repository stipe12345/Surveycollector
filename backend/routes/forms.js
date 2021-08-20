const router = require("express").Router();
const Form = require("../models/form.model");
const Question = require("../models/question.model");
const SurveyQuestion = require("../models/survey_questions.model");
var ObjectId = require("mongoose").Types.ObjectId;
router.post("/getform", async (req, res) => {
  const FindTitle = await Form.findOne({ _id: new ObjectId(req.body.FormID) });
  const Questions = await Question.find({ FormID: req.body.FormID });
  res.json({ Title: FindTitle.FormTitle, Questions: Questions });
});

router.post("/submitform", async (req, res) => {
  for (const question of req.body.Survey.Questions) {
    let existingQuestion = await SurveyQuestion.findOne({
      QuestionID: question._id,
    });
    if (!existingQuestion) {
      let newQuestion = new SurveyQuestion({
        FormID: question.FormID,
        QuestionID: question._id,
        ChosenAnswers: question.Answers,
      });
      await newQuestion.save();
    } else {
      existingQuestion.ChosenAnswers.push(question.Answers[0]);
      await existingQuestion.save();
    }
  }
  res.send("COMPLETED");
});
router.post("/fetchtitles", async (req, res) => {
  let ID = req.body.UserID.id;
  const Titles = await Form.find({ UserID: ID });
  res.json(Titles);
});
router.post("/fetchsurvey", async (req, res) => {
  let ID = req.body.FormID;
  const Survey = await SurveyQuestion.find({ FormID: ID });
  const Questions = await Question.find({ FormID: ID });
  let response = { Survey, Questions };
  res.json(response);
});
router.post("/createform", async (req, res) => {
  const newForm = new Form({
    UserID: req.body.user.id,
    FormTitle: req.body.title,
  });
  const savedForm = await newForm.save();
  for (const question of req.body.questions) {
    let newQuestion = new Question({
      FormID: savedForm._id,
      QuestionText: question.questiontext,
      QuestionType: "radio",
      NumberofAnswers: question.answernumber,
      Answers: question.answers,
    });
    await newQuestion.save();
  }
  res.json(savedForm._id);
});
module.exports = router;
