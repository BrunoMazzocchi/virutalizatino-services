const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("./middlewares/authMiddleware");
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
      let originalPath = proxyReq.path;
      const userId = req.userId;
      proxyReq.path =
        originalPath +
        (originalPath.includes("?") ? "&" : "?") +
        `userId=${userId}`;

      proxyReq.setHeader("X-User-Id", userId);
    },
  },
});

// Routes
app.use("/users", usersServiceProxy);
app.use("/posts", authMiddleware, postsServiceProxy);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
