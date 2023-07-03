import { useState } from "react";
import "./questionCard.css";


const Question = (props) => {
    const ques = props.data;
    const {ind, setAns, ans} = props;
    const [val, setVal] = useState(-1);

    const updateAns = (optionNo) => {
        let mark = -1;
        if(val === optionNo) setVal(-1);
        else {
            setVal(optionNo);
            mark = optionNo;
        }
        const temp = ans.map((num, i) => {
            if(i === ind) return {correctOption: num.correctOption, marked: mark};
            else return num;
        })
        setAns(temp);
    }

    return (
        <div className="question">
            <h3><span>Q.{ind+1}</span> {ques.description}</h3>
            <div className="options">
                <div>
                    <input type="checkbox" checked={val === 1} onChange={() => updateAns(1)} />
                    <span value={ques._id}>{ques.options[0]}</span>
                </div>
                <div>
                    <input type="checkbox" checked={val === 2} onChange={() => updateAns(2)} />
                    <span value={ques._id}>{ques.options[1]}</span>
                </div>
                <div>
                    <input type="checkbox" checked={val === 3} onChange={() => updateAns(3)} />
                    <span value={ques._id}>{ques.options[2]}</span>
                </div>
                <div>
                    <input type="checkbox" checked={val === 4} onChange={() => updateAns(4)} />
                    <span value={ques._id}>{ques.options[3]}</span>
                </div>
            </div>
        </div>
    )
}

export default Question;