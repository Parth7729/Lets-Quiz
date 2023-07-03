import { __dirname } from "../server.js";
import Quiz from "../models/model.js"

const postQuiz = async (req, res) => {

    const entry = req.body;

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