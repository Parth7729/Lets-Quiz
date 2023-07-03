import express from "express";
import getAll from "../controllers/getAll.js";
import getQuiz from "../controllers/getQuiz.js";
import postQuiz from "../controllers/postQuiz.js";

const router = express.Router();

router.get('/get-all', getAll);
router.get('/get-quiz/:id', getQuiz);
router.post('/post-quiz', postQuiz);

export default router;

