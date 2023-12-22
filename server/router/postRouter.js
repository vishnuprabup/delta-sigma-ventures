import express from "express";
import {
  getPostsController,
  postController,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", postController);
router.get("/getPost", getPostsController);

export default router;
