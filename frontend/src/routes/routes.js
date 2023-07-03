import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home/home.js";
import Quizes from "../components/getAll/getAll.js";
import NewQuiz from "../components/newQuiz/newQuiz.js";
import Quiz from "../components/quiz/quiz.js";


const router = createBrowserRouter([    //routes for the app
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/quizes",
        element: <Quizes />
    },
    {
        path: "/new-quiz",
        element: <NewQuiz />
    }
]);

export default router;