import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setBlogPost(null);
        setError(null);
        setLoading(true);
        const result = await axios.get("http://localhost:8080/blogPost", {});
        setBlogPost(result.data[0]);
        console.log("we here" + JSON.stringify(result.data[0]));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchBlogPost();
  }, []);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (!blogPost) return null;
  return (
    <div>
      <div>
        <div>{blogPost.title}</div>
        <div>{blogPost.pubDate}</div>
        <div>
          {blogPost.blogContents.map((blogContent) => {
            return (
              <>
                <h1>{blogPost.content}</h1>
                <img src={blogContent.image} alt="" />
                <h1>{blogContent.code}</h1>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
