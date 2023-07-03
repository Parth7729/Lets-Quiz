import "./submittedQues.css";


const SubmittedQues = (props) => {
    const {question, ans, ind} = props;
    const {correctOption, marked} = ans;
    return (
        <div className="question" >
            <h3>Q{ind+1}. {question.description}</h3>
            { question.options.map((option, i) => {
                return (
                    <div key={i} className={`option ${(correctOption === (i+1) ? "correct" : (marked === (i+1) ? "incorrect" : ""))}`} >
                        <span>{i+1}. {option}</span>
                    </div>
                )
            }) }
        </div>
    )
}

export default SubmittedQues;