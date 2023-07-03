import { useState } from "react";
import Shimmer from "../shimmer/shimmer.js";
import { useGetData } from "../../hooks/hooks.js";
import Error from "../error/error.js";
import QuizCard from "../quizCard/quizCard.js";
import Quiz from "../quiz/quiz.js";
import "./getAll.css";


const Quizes = () => {

    const data = useGetData();
    const [check, setCheck] = useState({
        status: false,
        data: {}
    });

    if(data.success === true && data.quizes.length === 0) return (<Error />);

    if(check.status === true) {
        return <Quiz data={check.data} />;
    }

    return data.success === false ? <Shimmer /> : (
        <div className="quiz-list">
            {
                data.quizes.map( ({_id, title, duration, questions}) => {
                    return <QuizCard setCheck={setCheck} _id={_id} title={title} duration={duration} questions={questions} key={_id} />
                } )
            }
        </div>
    );
}

export default Quizes;