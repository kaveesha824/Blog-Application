const express = require("express");
const { getPosts, getPost, createPost, updatePost, deletePost, searchPosts } = require("../controllers/postController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/:id", getPost);
router.post("/", protect, adminOnly, createPost);
router.put("/:id", protect, adminOnly, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);



module.exports = router;



