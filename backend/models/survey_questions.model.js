const mongoose = require("mongoose");

const survey_questionsSchema = new mongoose.Schema({
  FormID:{type:String},
  QuestionID:{type:String},
  ChosenAnswers:[String],
});



module.exports = Survey = mongoose.model("survey", survey_questionsSchema);