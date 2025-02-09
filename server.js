require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./config/db");
const Post = require("./models/Post"); // ✅ Ensure Post model is imported
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Sync database and create tables
sequelize.sync({ alter: true })
    .then(() => console.log("Database & tables synchronized"))
    .catch(err => console.error("Error syncing database:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
