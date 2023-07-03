import SubmittedQues from "../subittedQues/submittedQues.js"
import "./result.css";
import { useNavigate } from "react-router-dom";

const Result = (props) => {

    const navigate = useNavigate();

    const {ans, title, questions} = props;
    
    let correct = 0, incorrect = 0, notAnswered = 0;    //stores the result
    const noOfQues = questions.length;

    ans.map(({correctOption, marked }) => {     //calculating the result
        if(correctOption === marked) correct++;
        else if(marked !== -1) incorrect++;
        else notAnswered++;
        return null;
    });

    return (
        <div className="result" >
            <div className="score" >
                <h1>Score: {correct}/{noOfQues}</h1>
                <h4>correct: {correct}, incorrect: {incorrect}, not-answered: {notAnswered}</h4>
            </div>
            <h1>{title}</h1>

            { questions.map( (ques, i) => <SubmittedQues question={ques} ans={ans[i]} key={i} ind={i} /> ) }

            <button onClick={() => navigate("/", {replace: true})} >{'<'} Back to Quizes</button>

        </div>
    )
}

export default Result;