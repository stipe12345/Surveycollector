const router = require("express").Router();
const Form=require("../models/form.model");
const Question=require("../models/question.model");
var ObjectId = require('mongoose').Types.ObjectId;
router.post("/getform",async(req,res)=>{
    console.log(req.body);
    const FindTitle=await Form.findOne({_id:new ObjectId(req.body.FormID)})
    console.log(FindTitle);
    const Questions=await Question.find({FormID:req.body.FormID})
    console.log(Questions);
    res.json({Title:FindTitle.FormTitle,Questions:Questions});
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