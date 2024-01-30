import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("this is backend");
});

//SELECT or READ
app.get("/books", (req, res) => {
  const q = "select * from books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
});

//UPDATE
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`=?, `author`=?, `desc`=?, `price`=?, `cover`=? WHERE id = ?";
 
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.price,
    req.body.cover,
    bookId
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(" Update Book Successfully");
  });
});


//INSERT or CREATE
app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `author`, `desc`, `price`, `cover`) VALUES (?)";
  //const values = ["title from backend","author from backend","desc from backend","cover from backend"];
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ]; //from client

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//DELETE
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
});



app.listen(8800, () => {
  console.log("connected backend");
});
