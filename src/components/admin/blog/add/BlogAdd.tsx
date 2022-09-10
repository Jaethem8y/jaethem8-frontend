import React, {useState} from "react";
import {BlogPost} from "../../../../types/DTO";
import axios from "axios";
import {url} from "../../../../config";

export default function BlogAdd() {
  const [amount, setAmount] = useState(0);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    role: "",
    frontend: "",
    backend: "",
    description: "",
    general: "",
    contents: [],
  });

  const onPostChange = (e: React.ChangeEvent<HTMLInputElement>, t: string) => {
    setBlogPost({
      ...blogPost,
      [t]: e.target.value
    })
  }

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, t: string) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {...blogPost.contents[i], [t]: e.target.value},
        ...blogPost.contents.slice(i + 1),
      ]
    })
  }

  const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number, t: string) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          links: [
            ...blogPost.contents[i].links.slice(0, j),
            {...blogPost.contents[i].links[j], [t]: e.target.value},
            ...blogPost.contents[i].links.slice(j + 1)
          ]
        },
        ...blogPost.contents.slice(i + 1),
      ]
    })
  }

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number, t: string) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          images: [
            ...blogPost.contents[i].images.slice(0, j),
            {...blogPost.contents[i].images[j], [t]: e.target.value},
            ...blogPost.contents[i].images.slice(j + 1)
          ]
        },
        ...blogPost.contents.slice(i + 1),
      ]
    })
  }

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents,
        {
          title: "",
          location: amount,
          header: "",
          content: "",
          code: "",
          links: [],
          images: []
        }
      ]
    })
  };

  const addMoreLink = (i: number) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          links: [
            ...blogPost.contents[i].links,
            {
              tag: "",
              link: ""
            }
          ]
        },
        ...blogPost.contents.slice(i + 1)
      ]
    })
  }

  const addMoreImage = (i: number) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          images: [
            ...blogPost.contents[i].images,
            {
              image: "",
            }
          ]
        },
        ...blogPost.contents.slice(i + 1)
      ]
    })
  }

  const capturePost = () => {
    setBlogPost(blogPost)
    console.log(blogPost);
  };

  const addPost = () => {
    axios
      .post(url + "add/blogPost", blogPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("apiKey"),
        },
      })
      .then((res) => {
        alert("Post Has been Created Successfully !");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to Create a Post !");
      });
  };

  return (
    <div className="admin-post-wrapper">

    </div>
  )

}