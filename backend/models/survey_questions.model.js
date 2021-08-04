const mongoose = require("mongoose");

const survey_questionsSchema = new mongoose.Schema({
  SurveyID:{type:String},
  ChosenAnswers:[String],
});



module.exports = Survey = mongoose.model("survey", survey_questionsSchema);