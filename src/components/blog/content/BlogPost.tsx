import "../../../styles/post/post.scss";

import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import {url} from "../../../config";
import {BlogPost} from "../../../types/DTO";

export default function BlogPosts() {
  const {title} = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogPost, setBlogPost] = useState<BlogPost>();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(url + "API/blogPost/" + title);
        setBlogPost(res.data);
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
      <div className="view-project-wrapper">
        <div className="view-project-content">
          <p>Loading ... </p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="view-project-wrapper">
        <div className="view-project-content">
          <p>There has been an error ...</p>
        </div>
      </div>
    );
  }
  if (blogPost === null || blogPost === undefined) {
    return (
      <div className="view-project-wrapper">
        <div className="view-project-content">
          <p>There is no contents yet ...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="view-content-wrapper">
      <div className="view-content-content">
        <h3>Project Name : {blogPost.title}</h3>
        <div className="view-content-post">
          <p>
            <b>My Role: </b>
            {blogPost.role}
          </p>
          <p>
            <b> Frontend/backend/others:</b> {blogPost.frontend} /{" "}
            {blogPost.backend} / {blogPost.general}
          </p>
        </div>
        <>
          {blogPost.contents.map((content, i) => {
            return (
              <div className="view-content-inside" key={i}>
                {content.header !== "" && <h4>{content.header}</h4>}
                {content.content !== "" && <p>{content.content}</p>}
                {content.code !== "" && <code>{content.code}</code>}
                <>
                {content.links.map((link,j) => {
                  return (
                    <div className="view-content-inside" key={j}>
                      {link.tag !== "" && <p><b>{link.tag}</b><a href={link.link}>{link.link}</a></p>}
                    </div>
                  )
                })}
                </>
                <>
                {content.images.map((image,j) => {
                  return (
                    <div className="view-content-inside" key={j}>
                      {image.image !== "" && <img src={image.image} alt="" />}
                    </div>
                  )
                })}
                </>
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
}
