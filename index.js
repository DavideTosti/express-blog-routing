const express = require("express");
const app = express();
const port = 3000;
const postsRouter = require("./routers/posts");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`App in ascolto alla porta: ${port}`);
});

app.use(errorHandler);
app.use(notFound);
