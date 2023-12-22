import Post from "../models/postModel.js";

export const postController = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Post.create({
      title,
      description,
    });
    res.status(200).json({
      message: "post created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPostsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 4;

    const fullPost = await Post.find();

    const totalPages = Math.ceil(fullPost.length / limit);

    const posts = await Post.find()
    .sort({updatedAt: -1})
      .skip(page * limit)
      .limit(limit);

    res.status(200).json({ posts, page, limit, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
