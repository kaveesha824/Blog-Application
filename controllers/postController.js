const Post = require("../models/Post");
// const { Op } = require("sequelize");

const { Sequelize, Op } = require("sequelize");



exports.getPosts = async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
};

exports.getPost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
};

exports.createPost = async (req, res) => {
    const { title, content, author } = req.body;
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
    await Post.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Post updated" });
};

exports.deletePost = async (req, res) => {
    await Post.destroy({ where: { id: req.params.id } });
    res.json({ message: "Post deleted" });
};


exports.searchPosts = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
        console.log("🔍 Received search query:", query); 

        const posts = await Post.findAll({
            where: Sequelize.where(
                Sequelize.fn("LOWER", Sequelize.col("title")),
                {
                    [Op.like]: `%${query.toLowerCase()}%`
                }
            )
        });

        console.log("🔍 Search results:", posts); 
        res.json(posts);
    } catch (error) {
        console.error("❌ Error searching posts:", error);
        res.status(500).json({ message: "Error searching posts" });
    }
};
