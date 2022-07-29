import React, { useState, useEffect, useContext } from "react";
import { Fade } from "react-reveal";
import DisplayBlog from "./DisplayBlog";
import Modal from "react-modal";
import { cookieContext } from "../context/CookieContext";

import "./styles.css";
Modal.setAppElement("#root");

const Blog = () => {
  const { getCookie, cookie } = useContext(cookieContext);
  const [blogs, setBlogs] = useState([
    { _id: "", title: "", description: "", author: "", likes: 0, dislikes: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const blogging = async () => {
      setIsLoading(true);
      const response = await fetch("/blogs", {
        method: "GET",
      });
      const json = await response.json();
      setBlogs(json);
      setIsLoading(false);
    };
    blogging();
    // eslint-disable-next-line
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [blog, setBlog] = useState({ title: "", description: "" });
  const addBlog = async (title, description) => {
    const response = await fetch(`/blogs/addblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  set the auth token using cookie
        "auth-token": getCookie("authToken"),
      },
      body: JSON.stringify({ title, description }),
    });
    const blg = await response.json();
    setBlogs(blogs.concat(blg));
    setBlog({ title: "", description: ""});
  };

  function openModal() {
    setIsOpen(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    addBlog(blog.title, blog.description);
    setIsOpen(false);
  };
  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <button onClick={openModal} disabled={!cookie} className="add-blog">
        Add Blog
      </button>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <img src="loading.gif" alt="Loading" />
        </div>
      ) : (
        blogs.map((blog) => (
          <Fade right key={blog._id}>
            <DisplayBlog
              blog={blog}
              setBlogs={setBlogs}
            />
          </Fade>
        ))
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="row">
          <form
            className="col s8 offset-s2"
            method="POST"
            onSubmit={closeModal}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  type="text"
                  className="validate"
                  name="title"
                  value={blog.title}
                  onChange={onChange}
                  required={true}
                />
                <label htmlFor="title">Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  rows="4"
                  cols="50"
                  id="description"
                  className="materialize-textarea"
                  name="description"
                  value={blog.description}
                  onChange={onChange}
                  required={true}
                ></textarea>
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light s8 offset-s2"
              type="submit"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Blog;
