import { useState } from "react";
import Question from "../questionCard/questionCard.js";
import Timer from "../timer/timer.js"
import Result from "../result/result.js";
import "./quiz.css";


const Quiz = (props) => {

    const {title, duration, questions} = props.data;
    
    const [ans, setAns] = useState(questions.map( (ques) => ({correctOption: ques.correctOption, marked: -1}) ));   //stores the ans given by the user for each question
    const [submit, setSubmit] = useState(false);


    if(submit) {
        return (
            <Result ans={ans} title={title} questions={questions} />
        )
    }

    return (
        <div className="quiz">
            <Timer duration={duration} setSubmit={setSubmit} />
            <h2>{title}</h2>
            <div className="questions">
            { 
                questions.map( (ques, ind) => <Question data={ques} key={ques._id} ind={ind} setAns={setAns} ans={ans} /> ) 
            }
            </div>
            <button onClick={() => setSubmit(true)}>Submit Quiz</button>
        </div>
    )

};

export default Quiz;