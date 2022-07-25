import "./blogPosts.scss";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { url } from "../../config";
import { BlogPost } from "../../types/blog";

export default function BlogPosts() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(url + "API/blogPost/");
        setBlogPosts(res.data);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    };
    fetchBlogPost();
  }, []);

  if (loading) {
    return (
      <div className="view-post-wrapper">
        <div className="view-post-content">
          <p>Loading ... </p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="view-post-wrapper">
        <div className="view-post-content">
          <p>There has been an error ...</p>
        </div>
      </div>
    );
  }
  if (blogPosts === [] || blogPosts === null) {
    return (
      <div className="view-post-wrapper">
        <div className="view-post-content">
          <p>There is no contents yet ...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="view-post-wrapper">
      <div className="view-post-outer">
        <h3>List of Projects</h3>
        <div className="view-post-post">
          {blogPosts.map((post) => {
            return (
              <Link key={post.title} to={"/project/" + post.title}>
                <div className="view-project-inside">
                  <hr />
                  <h3>{post.title}</h3>
                  <p>
                    <b>role: </b> {post.role}
                  </p>
                  <p>
                    <b> frontend/backend/other: </b>
                    {post.frontend} / {post.backend} / {post.general}
                  </p>
                  <hr />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
