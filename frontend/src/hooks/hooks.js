import { useState, useEffect } from "react";


export const useGetData = () => {       //hook to get data from the server
    const [data, setData] = useState({success: false, quizes: []});

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const respond = await fetch("https://letsquiz-backend.onrender.com/api/get-all");
        const res = await respond.json();
        if(res.status || res.length === 0) {
            setData({success: true, quizes: []});
        }
        else setData({success: true, quizes: res});

    }

    return data;
    
}


export const useGetQuiz = (id) => {     //hook to get a particular quiz from the servrer
    const [data, setData] = useState({success: false});

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await fetch(`https://letsquiz-backend.onrender.com/api/get-quiz/${id}`);
        const res = await response.json();
        if(res.status || !res._id) {
            setData({success:true});
        }
        else setData({success:true, quizData: res});

    }

    return data;

}




export const useTimer = (duration) => {     //hook to implement the Timer. It calculates the time left in miliseconds and coverts that to hrs, mins, secs and returns it.


    const end = Date.now() + duration + 500; // 500 ms is added to compensate the time taken to load the quiz

    const getTimeLeft = () => {
        const timeLeft = end - Date.now();
        const hours = Math.floor(
            (timeLeft / (1000 * 60 * 60)) % 24
          );
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        return [hours, minutes, seconds];
    }

    const[h, m, s] = getTimeLeft();
    const [hrs, setHrs] = useState(h);
    const [mins, setMins] = useState(m);
    const [secs, setSecs] = useState(s);
    
    useEffect(() => {
        const timer = setInterval(() => {
            const [hours, minutes, seconds] = getTimeLeft();
            setHrs(hours);
            setMins(minutes);
            setSecs(seconds);
        }, 1000);

        return () => clearInterval(timer);

    }, []);


    return [hrs, mins, secs];

}