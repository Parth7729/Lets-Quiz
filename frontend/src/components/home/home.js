import "./home.css";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
    
    return (
        <div className="home">
            <Link to={"/quizes"}><div className="qiuz-btn" >Quizes</div></Link>
            <Link to={"/new-quiz"}><div className="newquiz-btn" >New Quiz</div></Link>
        </div>
    )
};


export default Home;