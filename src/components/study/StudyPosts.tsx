import "./studyPosts.scss";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { url } from "../../config";
import { StudyPost } from "../../types/study";

export default function BlogPosts() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studyPosts, setStudyPosts] = useState<StudyPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(url + "API/studyPost/");
        setStudyPosts(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    };
    fetchPost();
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
      <div className="view-post-wrapper">
        <div className="view-post-content">
          <p>There has been an error ...</p>
        </div>
      </div>
    );
  }
  if (studyPosts.length === 0 || studyPosts === null) {
    return (
      <div className="view-post-wrapper">
        <div className="view-post-content">
          <h3>There is no contents yet for study ...</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="view-post-wrapper">
      <div className="view-post-content">
        <h3>List of Study Post</h3>
        <div className="view-post-post">
          {studyPosts.map((post) => {
            return (
              <Link key={post.title} to={"/study/" + post.title}>
                <div className="view-post-inside">
                  <hr />
                  <h3>{post.title}</h3>
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
