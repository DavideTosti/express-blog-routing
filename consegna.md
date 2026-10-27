In questo esercizio andremo a creare il server back-end per la gestione di un nostro blog.

Creaiamo un nuovo progetto Express settando in un file app.js: app, listen() e una rotta / con un testo semplice 'Server del mio blog'.

Testiamo la rotta / con Postman

Settiamo gli asset statici dando come cartella di accesso la public

Creare un file di routing (routers/posts.js) che conterrà le rotte necessario per l'entità posts.

All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)

Tutte le risposte saranno, per ora, dei testi semplici che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST. Ad esempio:
Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;
Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”
e via dicendo…

Registrare il router dentro app.js con il prefisso posts/.

Testare tuttle le rotte del router in Postman

---

# 🧑‍🏫 Tutorial: spiegazione dell'esercizio svolto

Questa sezione spiega, punto per punto, il codice che abbiamo scritto durante l'esercizio.

## 1. Il server (`app.js`)

**Obiettivo:** creare il server back-end del blog.

**Spiegazione del codice:**
- `const express = require("express");` → importiamo la libreria Express.
- `const app = express();` → creiamo l'istanza dell'applicazione.
- `const port = 3000;` → definiamo la porta del server.
- `app.get("/", (req, res) => { res.send("Server del mio blog"); });` → registra la route per le richieste `GET` sulla root (`/`).
- `app.listen(port, () => { ... });` → mettiamo il server in ascolto sulla porta.

## 2. Gli asset statici

`app.use(express.static("public"));` → middleware che serve i file della cartella `public` come risorse statiche. Un file come `public/favicon.svg` sarà raggiungibile all'indirizzo `/favicon.svg`.

## 3. Il router (`routers/posts.js`)

Un router in Express è un sotto-montaggio di route che poi registriamo in `app.js`.

### Index – `GET /posts`

`router.get("/", ...)` risponde con "Lista dei post". Con il prefisso `/posts` montato, la route diventa `/posts`.

### Show – `GET /posts/:id`

`router.get("/:id", ...)` → `:id` è un parametro dinamico; `req.params.id` contiene il valore passato dall'URL (es. da `/posts/5` → `"5"`).

### Create – `POST /posts`

`router.post("/", ...)` → risponde con "Creazione del post".

### Update – `PUT /posts/:id`

`router.put("/:id", ...)` → risponde con "Aggiornamento del post X".

### Delete – `DELETE /posts/:id`

`router.delete("/:id", ...)` → risponde con "Cancellazione del post X".

## 4. Registrazione del router

In `app.js`:

```js
const postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);
```

`app.use("/posts", ...)` monta il router sotto il prefisso `/posts`.

## 5. Test

Dopo aver avviato il server con `node app.js`, si testano tutte le rotte con Postman:

- `GET /` → "Server del mio blog"
- `GET /posts` → "Lista dei post"
- `GET /posts/1` → "Dettaglio del post 1"
- `POST /posts` → "Creazione del post"
- `PUT /posts/1` → "Aggiornamento del post 1"
- `DELETE /posts/1` → "Cancellazione del post 1"
