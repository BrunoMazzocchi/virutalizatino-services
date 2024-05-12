const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("./middlewares/authMiddleware");
const tokenMiddleware = require("./middlewares/tokenMiddleware");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config({
  path: path.resolve(__dirname, "./config/env/dev.env"),
});

const usersServiceProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/users": "/",
  },
});

const postsServiceProxy = createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,
  pathRewrite: {
    "^/posts": "/",
  },
  // Gets the req
  on: {
    proxyReq: (proxyReq, req) => {
      // Adding userId to the query string
      let originalPath = proxyReq.path;
      const userId = req.userId; // You can dynamically assign this based on actual req properties or other logic

      // Append userId to the query string
      proxyReq.path =
        originalPath +
        (originalPath.includes("?") ? "&" : "?") +
        `userId=${userId}`;

      // Alternatively, if you need to set headers instead
      proxyReq.setHeader("X-User-Id", userId);
    },
  },
});

// Routes
app.use("/users", usersServiceProxy);
app.use("/posts", authMiddleware, tokenMiddleware, postsServiceProxy);

// Define protected routes
app.get("/courses", (req, res) => {
  res.json({ message: "Courses fetched successfully" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
