const express = require("express");
const router = express.Router();

// index (READ)
router.get("/", (req, res) => {
  res.send("Lista dei post");
});

//show (READ)
router.get("/:id", (req, res) => {
  const postId = req.params.id;
  res.send(`Dettagli del post con id: ${postId}`);
});

//store (CREATE)
router.post("/", (req, res) => {
  res.send("Creazione nuovo post");
});

//update (UPDATE)
router.put("/:id", (req, res) => {
  const postId = req.params.id;
  res.send(`Modifica integrale del post con id: ${postId}`);
});

//modify (UPDATE)
router.patch("/:id", (req, res) => {
  const postId = req.params.id;
  res.send(`Modifica parziale del post con id: ${postId}`);
});

//destroy (DELETE)
router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  res.send(`Cancellazione del post con id: ${postId}`);
});

module.exports = router;
