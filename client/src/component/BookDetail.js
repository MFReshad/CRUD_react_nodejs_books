// BookDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const BookDetail = () => {
  const [book, setBook] = useState(null);
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

  const handleDelete = async (id)=>{
    try {
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.href = '/';
    } catch (err) {
      console.log(err)
    }
  }

  if (!book) return <div>Loading...</div>;

  return (
    <div className="bookdetail">
      {book.cover && <img src={book.cover} alt="" />}
      <h2>{book.title}</h2>
      <p>
        <b>{book.author}</b>
      </p>
      <span>{book.price}/-</span>
      <p>{book.desc}</p>
      {/* Other book details */}
      <div className="bookButtonDiv">
      <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
      <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
      </div>
    </div>
  );
};

export default BookDetail;
