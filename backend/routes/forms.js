const router = require("express").Router();
const Form=require("../models/form.model");
const Question=require("../models/question.model");
const SurveyQuestion=require("../models/survey_questions.model");
var ObjectId = require('mongoose').Types.ObjectId;
router.post("/getform",async(req,res)=>{
    console.log(req.body);
    const FindTitle=await Form.findOne({_id:new ObjectId(req.body.FormID)})
    console.log(FindTitle);
    const Questions=await Question.find({FormID:req.body.FormID})
    console.log(Questions);
    res.json({Title:FindTitle.FormTitle,Questions:Questions});
})

router.post("/submitform",async(req,res)=>{
/*console.log(req.body)
console.log(req.body.Survey)
console.log(req.body.Survey.Questions);
console.log(req.body.Survey.Questions[0].Answers);*/
for(const question of req.body.Survey.Questions){
let existingQuestion=await SurveyQuestion.findOne({QuestionID:question._id});
if(!existingQuestion)
{
    let newQuestion = new SurveyQuestion({
        FormID:question.FormID,
        QuestionID:question._id,
        ChosenAnswers:question.Answers})
        const savedQuestion=await newQuestion.save();
        console.log(savedQuestion);
}
else
{
    existingQuestion.ChosenAnswers.push(question.Answers[0]);
    await existingQuestion.save();
}
}
res.send("COMPLETED");
})
router.post("/fetchtitles",async(req,res)=>{
    console.log(req.body);
    let ID=req.body.UserID.id;
    const Titles=await Form.find({UserID:ID});
    console.log(Titles);
    res.json(Titles);
})
router.post("/fetchsurvey",async(req,res)=>{
    console.log(req.body);
    let ID=req.body.FormID;
    console.log(ID);
    const Survey=await SurveyQuestion.find({FormID:ID});
    const Questions=await Question.find({FormID:ID});
    console.log(Survey);
    console.log(Questions);
    let response={Survey,Questions}
    res.json(response);
})
router.post("/createform",async(req,res)=>{
   /* console.log(req.body);
    console.log(req.body.user);
    console.log(req.body.questions);
    console.log(req.body.questions[0].answers);
    for(let i=0;i<req.body.questions.length;i++)
    {
        console.log(req.body.questions[i]);
    }*/
    const newForm=new Form({
        UserID:req.body.user.id,
        FormTitle:req.body.title,
    })
    const savedForm=await newForm.save();
    console.log(savedForm);
    for(const question of req.body.questions){
        let newQuestion=new Question({
            FormID:savedForm._id,
            QuestionText:question.questiontext,
            QuestionType:"radio",
            NumberofAnswers:question.answernumber,
            Answers:question.answers
        })
        const savedQuestion=await newQuestion.save();
        console.log(savedQuestion);
    }
    res.json(savedForm._id);
});
module.exports=router;