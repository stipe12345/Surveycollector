const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  FormID: { type: String },
  QuestionText: { type: String },
  QuestionType: { type: String },
  NumberofAnswers: { type: String },
  Answers: [String],
});

module.exports = Question = mongoose.model("question", questionSchema);
