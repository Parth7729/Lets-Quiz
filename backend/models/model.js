import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    title: String,
    duration: Number,
    questions: [{
        description: String,
        options: [{ type: String }],
        correctOption: Number
    }],
});


const Quizes = mongoose.model("quiz_db", quizSchema);

export default Quizes;