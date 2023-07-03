import { __dirname } from "../server.js";
import Quiz from "../models/model.js"

const postQuiz = async (req, res) => {

    const entry = req.body;

    // {
    //     title: "this is the title",
    //     duration: 10000,
    //     questions: [
    //         {
    //             description: "this is the discription1",
    //             options: ["this is the ques1", "this is the ques2", "this is the ques3", "this is the ques4"],
    //             correctOption: 2
    //         },
    //         {
    //             description: "this is the discription2",
    //             options: ["this is the ques1", "this is the ques2", "this is the ques3", "this is the ques4"],
    //             correctOption: 4
    //         }
    //     ]
    // }

    const quiz = new Quiz({title: entry.title, duration: entry.duration});

    entry.questions.map(({description, options, correctOption}) => {
        quiz.questions.push({description, options, correctOption});
    });

    try {
        await quiz.save();
        res.json({
            status: 201,
            success: true
        });
    }
    catch(e) {
        console.log(e);
        res.json({
            status: 406,
            success: false,
            message: "Internal Server error or the data sent was invalid"
        });
    }


}


export default postQuiz;