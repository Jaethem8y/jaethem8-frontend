import "../../../../styles/admin/post.scss";
import React, { useState } from "react";
import {post} from "../../../../types/DTO";
import axios from "axios";
import { url } from "../../../../config";
import { CHANGE_EVENT } from "../../../../types/HTMLEvent";

export default function StudyAdd(){
  const [amount, setAmount] = useState(0);
  const [post,setpost] = useState<post>({
    title:"",
    description:"",
    pubDate:"",
    contents:[]
  })

  const onpostChange = (e: CHANGE_EVENT, t: string) => {
    setpost({
      ...post,
      [t]: e.target.value,
    });
  };

  const onContentChange = (e: CHANGE_EVENT, i: number, t: string) => {
    setpost({
      ...post,
      contents: [
        ...post.contents.slice(0, i),
        { ...post.contents[i], [t]: e.target.value },
        ...post.contents.slice(i + 1),
      ],
    });
  };

  const onLinkChange = (e: CHANGE_EVENT, i: number, j: number, t: string) => {
    setpost({
      ...post,
      contents: [
        ...post.contents.slice(0, i),
        {
          ...post.contents[i],
          links: [
            ...post.contents[i].links.slice(0, j),
            { ...post.contents[i].links[j], [t]: e.target.value },
            ...post.contents[i].links.slice(j + 1),
          ],
        },
        ...post.contents.slice(i + 1),
      ],
    });
  };

  const onImageChange = (e: CHANGE_EVENT, i: number, j: number, t: string) => {
    setpost({
      ...post,
      contents: [
        ...post.contents.slice(0, i),
        {
          ...post.contents[i],
          images: [
            ...post.contents[i].images.slice(0, j),
            { ...post.contents[i].images[j], [t]: e.target.value },
            ...post.contents[i].images.slice(j + 1),
          ],
        },
        ...post.contents.slice(i + 1),
      ],
    });
  };

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setpost({
      ...post,
      contents: [
        ...post.contents,
        {
          location: amount,
          header: "",
          content: "",
          code: "",
          links: [],
          images: [],
        },
      ],
    });
    console.log(post);
  };

  const addMoreLink = (i: number) => {
    setpost({
      ...post,
      contents: [
        ...post.contents.slice(0, i),
        {
          ...post.contents[i],
          links: [
            ...post.contents[i].links,
            {
              tag: "",
              link: "",
            },
          ],
        },
        ...post.contents.slice(i + 1),
      ],
    });
  };

  const addMoreImage = (i: number) => {
    setpost({
      ...post,
      contents: [
        ...post.contents.slice(0, i),
        {
          ...post.contents[i],
          images: [
            ...post.contents[i].images,
            {
              image: "",
            },
          ],
        },
        ...post.contents.slice(i + 1),
      ],
    });
  };

  const capturepost = () => {
    setpost(post);
    console.log(post);
  };

  const addpost = () => {
    capturepost();
    axios
      .post(url + "add/post", post, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("apiKey"),
        },
      })
      .then((res) => {
        alert("post Has been Created Successfully !");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to Create a post !");
      });
  };
}