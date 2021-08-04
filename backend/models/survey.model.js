const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  FormID:{type:String},
});



module.exports = Survey = mongoose.model("survey", surveySchema);