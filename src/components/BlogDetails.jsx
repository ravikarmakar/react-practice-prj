import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

function BlogDetails() {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/` + id);

  const navigation = useNavigate();

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/` + blog.id, {
      method: "DELETE",
    }).then(() => {
      navigation("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loding....</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>{`written by ${blog.author}`}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
}

export default BlogDetails;
