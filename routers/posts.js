const express = require("express");
const router = express.Router();
const connection = require("../data/db");

// index (READ)
router.get("/", (req, res, next) => {
  // prepariamo la query
  const sqlPosts = "SELECT * FROM posts";

  //eseguiamo la query
  connection.query(sqlPosts, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});

//show (READ)
router.get("/:id", (req, res, next) => {
  //recuperiamo l'id dall'URL
  const postId = req.params.id;

  //prepariamo la query dalla tabella uno
  const sqlPost = `SELECT * FROM posts WHERE id=?`;

  // prepariamo la query per la tabella due
  const sqlPostTags = `
  SELECT tags.*
  FROM tags
  JOIN post_tag
  ON tags.id = post_tag.tag_id
  WHERE post_tag.post_id = ?
  `;

  //eseguiamo la prima query
  connection.query(sqlPost, [postId], (err, postResults) => {
    if (err) {
      return next(err);
    }
    if (postResults.length === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }

    //Recuperiamo i dati
    const post = postResults[0];

    //Se è andata a buon fine, si esegue la seconda query
    connection.query(sqlPostTags, [postId], (err, tagResults) => {
      if (err) {
        return next(err);
      } //aggiungiamo i datiDue ai datiUno
      post.tags = tagResults;
      res.json(post);
    });
  });
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
router.delete("/:id", (req, res, next) => {
  const postId = req.params.id;

  //prepariamo la query
  const sqlPost = `DELETE FROM posts WHERE id=?`;

  //eseguiamo la query
  connection.query(sqlPost, [postId], (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }
    res.sendStatus(204);
  });
});

module.exports = router;
