import "./quizCard.css";


const QuizCard = ({_id, title, duration, questions, setCheck}) => {

    const hours = Math.floor(
        (duration / (1000 * 60 * 60)) % 24
      );
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    const len = questions.length;

    return (
        <div className="quiz-card" onClick={() => {
            setCheck({
                status: true,
                data: {
                    title: title,
                    duration: duration,
                    questions: questions
                }
            })
        }}>
            <h3>{title}</h3>
            <div>
                <p>{len} Questions</p>
                <p>{hours}hrs {minutes}mins</p>
            </div>
        </div>
    )
}

export default QuizCard;