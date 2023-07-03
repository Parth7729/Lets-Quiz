import { useEffect, useState } from "react";
import "./questionCard.css";


const Question = (props) => {
    const ques = props.data;
    const {ind, setAns, ans} = props;
    const [val, setVal] = useState(-1);     //val stores the option selected for the question

    const updateAns = (optionNo) => {
        if(val === optionNo) 
            setVal(-1);    //val === optionNo if the option is already selected. this means the option if unselected so set the val to -1.
        else 
            setVal(optionNo);
    }

    useEffect(() => {       //updates the ans if the marked val is changed
        const temp = ans.map((num, i) => {
            if(i === ind) return {correctOption: num.correctOption, marked: val};
            else return num;
        })
        setAns(temp);
    }, [val])

    return (
        <div className="question">
            <h3><span>Q.{ind+1}</span> {ques.description}</h3>
            <div className="options">

                {
                    ques.options.map( (option, i) => {
                        return (
                            <div>
                                <input type="checkbox" checked={val === i+1} onChange={() => updateAns(i+1)} />
                                <span value={ques._id}>{option}</span>
                            </div>
                        )
                    } )
                }

            </div>
        </div>
    )
}

export default Question;