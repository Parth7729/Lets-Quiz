import { useTimer } from "../../hooks/hooks.js";
import "./timer.css";


const Timer = (props) => {  //timer functional component

    const {duration, setSubmit} = props;

    const [hrs, mins, secs] = useTimer(duration);

    if(hrs === 0 && mins === 0 && secs === 0) setSubmit(true);

    return (
        <div className="timer">
            <p>{hrs} : {mins} : {secs}</p>
        </div>
    )
}

export default Timer;