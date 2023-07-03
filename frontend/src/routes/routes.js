import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home/home.js";
import Quizes from "../components/getAll/getAll.js";
import NewQuiz from "../components/newQuiz/newQuiz.js";
import Quiz from "../components/quiz/quiz.js";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/quizes",
        children: [
            {
                path: "",
                element: <Quizes />
            },
            {
                path: ":id",
                element: <Quiz />
            }
        ]
    },
    {
        path: "/new-quiz",
        element: <NewQuiz />
    }
]);

export default router;