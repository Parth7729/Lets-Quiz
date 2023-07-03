import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newQuiz.css";


const NewQuiz = () => {

    const navigate = useNavigate();

    const ques = {description: "", options: ["", "", "", ""], correctOption: -1}; //question format template object
    const [formData, setFormData] = useState({      //formData stores the data filled by the user
        title: "",
        duration: 0,
        questions: [ques]
    });

    const [time, setTime] = useState({          //time useState stores the time in (hrs, mins, secs) from the form
        hrs: 0,
        mins: 0,
        secs: 0
    });

    const [submitted, setSubmitted] = useState(false);  //true if form is submitted, false otherwise

    const handleTitleChange = (event) => {      //handles change in title in the form
        const {duration, questions} = formData;
        setFormData({title:event.target.value, duration, questions});
    }

    const handleActualDuration = (data) => {        //converts the given time in (hrs, mins, secs) to miliseconds and updates the formData
        let calc_time = ((data.hrs) * 60 * 60 * 1000) + ((data.mins) * 60 * 1000) + ((data.secs) * 1000);
        const temp = {...formData};
        temp.duration = calc_time;
        setFormData(temp);
    }

    const handleDurationChange = (event) => {       //updates the time useState
        const data = {...time};
        data[event.target.name] = Number(event.target.value);
        setTime(data);

        handleActualDuration(data);

    }


    const handleQuestionChange = (e, i) => {        //updates the description of ith question in formData
        const data = {...formData};
        data.questions[i][e.target.name] = e.target.value;
        setFormData(data);
    }

    const handleOptionChange = (e, i, ind) => {     //updates the option of ith question in formData
        const data = {...formData};
        data.questions[i].options[ind] = e.target.value;
        setFormData(data);
    }

    const handleCorrectOptionChange = (i, ind) => {     //updates the correct option of ith question in formData
        const data = {...formData};
        data.questions[i].correctOption = ind+1;
        setFormData(data);
    }

    const handleAddQuestion = () => {       //adds a new question template
        const data = {...formData};
        data.questions = [...data.questions, ques];
        setFormData(data);
    }

    const validateData = () => {    //checks if the form filled is validates or not
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


    const handleSubmitForm = async () => {      //sends the data to the backend server
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