import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newQuiz.css";


const NewQuiz = () => {

    const navigate = useNavigate();

    const ques = {description: "", options: ["", "", "", ""], correctOption: -1};
    const [formData, setFormData] = useState({
        title: "",
        duration: 0,
        questions: [ques]
    });

    const [time, setTime] = useState({
        hrs: 0,
        mins: 0,
        secs: 0
    });

    const [submitted, setSubmitted] = useState(false);

    const handleTitleChange = (event) => {
        const {duration, questions} = formData;
        setFormData({title:event.target.value, duration, questions});
    }

    const handleActualDuration = (data) => {
        let calc_time = ((data.hrs) * 60 * 60 * 1000) + ((data.mins) * 60 * 1000) + ((data.secs) * 1000);
        const temp = {...formData};
        temp.duration = calc_time;
        setFormData(temp);
    }

    const handleDurationChange = (event) => {
        const data = {...time};
        data[event.target.name] = Number(event.target.value);
        setTime(data);

        handleActualDuration(data);

    }


    const handleQuestionChange = (e, i) => {
        const data = {...formData};
        data.questions[i][e.target.name] = e.target.value;
        setFormData(data);
    }

    const handleOptionChange = (e, i, ind) => {
        const data = {...formData};
        data.questions[i].options[ind] = e.target.value;
        setFormData(data);
    }

    const handleCorrectOptionChange = (i, ind) => {
        const data = {...formData};
        data.questions[i].correctOption = ind+1;
        setFormData(data);
    }

    const handleAddQuestion = () => {
        const data = {...formData};
        data.questions = [...data.questions, ques];
        setFormData(data);
    }

    const validateData = () => {
        let valid = true;
        if(formData.title === "" || formData.duration === 0) valid = false;
        else {
            formData.questions.map((ques) => {
                if(ques.description === "" || ques.correctOption === -1) valid = false;
                else {
                    ques.options.map((option) => {
                        if(option === "") valid = false;
                        return null;
                    })
                }

                return null;
            })
        }
        return valid;
    }


    const handleSubmitForm = async () => {
        const valid =  validateData();
        if(!valid) {
            alert("Please fill the form correctly");
            return;
        }

        setSubmitted(true);
        const res = await fetch("https://letsquiz-backend.onrender.com/api/post-quiz", {
            method:"POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await res.json();
        if(response.success === true) navigate("/quizes", {replace: true});
        else navigate("/", {replace: true});
    }


    return (
        <div className="quiz-form">
            <h2>Create a Quiz</h2>
            <div className="floating-label-group title">
                <input name="title" value={formData.title} onChange={(e) => handleTitleChange(e)} />
                <label className="floating-label">Title</label>
            </div>

            <div className="duration">
                <div className="floating-label-group">
                    <input value={time.hrs} name="hrs" type="number" onChange={(e) => handleDurationChange(e)} />
                    <label className="floating-label">Hours</label>
                </div>
                <div className="floating-label-group">
                    <input value={time.mins} name="mins" type="number" onChange={(e) => handleDurationChange(e)} />
                    <label className="floating-label">Minutes</label>
                </div>
                <div className="floating-label-group">
                    <input value={time.secs} name="secs" type="number" onChange={(e) => handleDurationChange(e)} />
                    <label className="floating-label">Seconds</label>
                </div>
            </div>

            {
                formData.questions.map((ques,i) => {
                    return (
                        <div className="question" key={i} >
                            <div className="floating-label-group">
                                <input className="description" type="text" name="description" value={ques.description} onChange={(e) => handleQuestionChange(e, i)} />
                                <label className="floating-label">Question {i+1}</label>
                            </div>

                            <div className="options">

                                {
                                    ques.options.map((option, ind) => {
                                        return (<div key={ind} className="floating-label-group">
                                            <input type="checkbox" onChange={() => handleCorrectOptionChange(i, ind)} checked={ques.correctOption === ind+1} />
                                            <label className="floating-label">Option {ind+1}</label>
                                            <input className="option" name="option" value={option} onChange={(e) => handleOptionChange(e, i, ind)} />
                                        </div>)
                                    })
                                }

                            </div>
                            
                        </div>
                    )
                })
            }

            <button className="add-ques" onClick={() => handleAddQuestion()} >+ Question</button>

            <button className={`submit ${submitted ? "submitted" : ""}`} onClick={() => handleSubmitForm()} disabled={submitted}>Submit</button>

        </div>
    )
};


export default NewQuiz;