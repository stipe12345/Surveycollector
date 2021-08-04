const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  UserID:{type:String},
  FormTitle:{type:String},
});



module.exports = Form = mongoose.model("form", formSchema);