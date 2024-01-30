import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        desc: '',
        price: '',
        cover: ''
      });
      
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, [id]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClcik = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${id}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //console.log(book);
  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="title"
        value={book ? book.title : ""}
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="author name"
        value={book ? book.author : ""}
        onChange={handleChange}
        name="author"
      />
      <textarea
        type="text"
        placeholder="description"
        value={book ? book.desc : ""}
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="price"
        value={book ? book.price : ""}
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        value={book ? book.cover : ""}
        onChange={handleChange}
        name="cover"
      />

      <button className="formButton" onClick={handleClcik}>
        Update
      </button>
    </div>
  );
};

export default Update;
