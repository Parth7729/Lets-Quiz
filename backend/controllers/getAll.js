import Quizes from "../models/model.js";

const getAll = async (req, res) => {

    try {
        const quizes = await Quizes.find({});
        quizes.reverse();
        res.json(quizes);
    }

    catch(e) {
        res.json({
            status: 404,
            success: false,
            message: "objects not found"
        });
    }
}


export default getAll;