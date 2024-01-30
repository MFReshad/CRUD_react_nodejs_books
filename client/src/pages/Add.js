import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [book, setBooks] = useState({
    title: "",
    author: "",
    desc: "",
    price: "",
    cover: ""
  });


  const navigate = useNavigate()

  const handleChange = (e) =>{
    setBooks(prev=>({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleClcik = async e =>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/books", book)
        navigate("/")
    }catch(err){
        console.log(err)
    }
  }

  //console.log(book);

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title"/>
      <input type="text" placeholder="author name" onChange={handleChange} name="author"/>
      <input type="text" placeholder="description" onChange={handleChange} name="desc" />
      <input type="number" placeholder="price" onChange={handleChange} name="price"/>
      <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
      <button onClick={handleClcik}>Add</button>
    </div>
  );
};

export default Add;
