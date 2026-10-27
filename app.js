const express = require("express");
const app = express();
const port = 3000;
const postsRouter = require("./routers/posts");

//ASSET STATICI
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server in ascolto alla porta: ${port}`);
});
