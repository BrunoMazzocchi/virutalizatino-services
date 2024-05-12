const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

const usersServiceProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/users": "/",
  },
});

const postsServiceProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/posts": "/",
  },
});

// Routes
app.use("/users", usersServiceProxy);
app.use("/posts", postsServiceProxy);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
