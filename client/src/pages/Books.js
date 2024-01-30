import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const feathAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        //console.log(res)
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    feathAllBooks();
  }, []);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="header-title">Books</h1>
        <div className="header-button">
          <button>
            <Link to="/add">Add New Book</Link>
          </button>
        </div>
      </div>

      <br />
      <br />
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <Link to={`/${book.id}`} style={{ textDecoration: "none" }}>
              <h3>{book.title}</h3>
            </Link>
            <p>
              <b>{book.author}</b>
            </p>
            <span>{book.price}/-</span>
            <p>{truncateText(book.desc, 100)}</p>
            <Link to={`/${book.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
