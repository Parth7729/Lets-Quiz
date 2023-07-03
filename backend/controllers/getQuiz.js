import Quizes from "../models/model.js";


const getQuiz = async (req, res) => {

    const id = req.params.id;

    try {
        const quiz = await Quizes.findOne({_id:id});
        res.json(quiz);
    }

    catch(e) {
        res.json({
            status: 404,
            success: false,
            message: "object not found"
        });
    }


}


export default getQuiz;