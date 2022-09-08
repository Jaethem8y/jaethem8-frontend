// import "./projectEdit.scss";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import { url } from "../../../../config";
// import { BlogPost, BlogContent } from "../../../../types/blog";

// export default function ProjectEdit() {
//   const { title } = useParams();
//   const [amount, setAmount] = useState(0);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [blogPost, setBlogPost] = useState<BlogPost>({
//     title: "",
//     role: "",
//     frontend: "",
//     backend: "",
//     general: "",
//     contents: [],
//   });
//   const [blogContentsArray, setBlogContentsArray] = useState<
//     Array<BlogContent>
//   >([]);

//   useEffect(() => {
//     const fetchBlogPost = async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const res = await axios.get(url + "API/blogPost/" + title);
//         setBlogPost(res.data);
//         setBlogContentsArray(res.data.blogContents);
//         setAmount(res.data.blogContents.length);
//         setLoading(false);
//       } catch (e) {
//         setError(true);
//         console.log(e);
//       }
//     };
//     fetchBlogPost();
//   }, []);

//   const onPostRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBlogPost({
//       ...blogPost,
//       role: e.target.value,
//     });
//   };
//   const onPostFrontendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBlogPost({
//       ...blogPost,
//       frontend: e.target.value,
//     });
//   };
//   const onPostBackendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBlogPost({
//       ...blogPost,
//       backend: e.target.value,
//     });
//   };
//   const onPostGeneralChagne = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBlogPost({
//       ...blogPost,
//       general: e.target.value,
//     });
//   };

//   const onContentChange = (
//     e:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLTextAreaElement>,
//     i: number,
//     t: string
//   ) => {
//     setBlogContentsArray([
//       ...blogContentsArray.slice(0, i),
//       { ...blogContentsArray[i], [t]: e.target.value },
//       ...blogContentsArray.slice(i + 1),
//     ]);
//   };

//   const addMoreContent = () => {
//     setAmount((amount) => amount + 1);
//     setBlogContentsArray([
//       ...blogContentsArray,
//       {
//         location: amount,
//         header: "",
//         content: "",
//         link: "",
//         image: "",
//         code: "",
//       },
//     ]);
//   };

//   const editPost = () => {
//     axios
//       .post(url + "edit/blogPost", blogPost, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("apiKey"),
//         },
//       })
//       .then((res) => {
//         alert("Post Has been Edited Successfully !");
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("Failed to edit a Post !");
//       });
//   };

//   const deletePost = () => {
//     axios
//       .post(url + "delete/blogPost", blogPost, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("apiKey"),
//         },
//       })
//       .then((res) => {
//         alert("Post Has been Deleted Successfully !");
//       })
//       .catch((err) => {
//         alert("Failed to Delete a Post !");
//       });
//   };

//   const capturePost = () => {
//     setBlogPost({
//       ...blogPost,
//       contents: blogContentsArray,
//     });
//   };

//   if (loading) {
//     return <h3>Loading ...</h3>;
//   }
//   if (error) {
//     return <h3>There has been an error</h3>;
//   }

//   return (
//     <div className="add-project-wrapper">
//       <div className="add-project-content">
//         <h3>Edit a Project Post</h3>
//         <div className="add-project-post">
//           <table>
//             <tbody>
//               <tr>
//                 <td>title : </td>
//                 <td>
//                   <input type="text" value={blogPost.title} disabled />
//                 </td>
//               </tr>
//               <tr>
//                 <td>role : </td>
//                 <td>
//                   <input
//                     type="text"
//                     onChange={(e) => onPostRoleChange(e)}
//                     value={blogPost.role}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>frontend : </td>
//                 <td>
//                   <input
//                     type="text"
//                     onChange={(e) => onPostFrontendChange(e)}
//                     value={blogPost.frontend}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>backend : </td>
//                 <td>
//                   <input
//                     type="text"
//                     onChange={(e) => onPostBackendChange(e)}
//                     value={blogPost.backend}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>general : </td>
//                 <td>
//                   <input
//                     type="text"
//                     onChange={(e) => onPostGeneralChagne(e)}
//                     value={blogPost.general}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           {Array.from(Array(amount), (el, i) => {
//             return (
//               <div className="add-project-objecs" key={i}>
//                 <hr />
//                 <h5>Add More Content</h5>
//                 <table>
//                   <tbody>
//                     <tr>
//                       <td>Header : </td>
//                       <td>
//                         <input
//                           type="text"
//                           onChange={(e) => onContentChange(e, i, "header")}
//                           value={blogContentsArray[i].header}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Image : </td>
//                       <td>
//                         <input
//                           type="text"
//                           onChange={(e) => onContentChange(e, i, "image")}
//                           value={blogContentsArray[i].image}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Link : </td>
//                       <td>
//                         <input
//                           type="text"
//                           onChange={(e) => onContentChange(e, i, "link")}
//                           value={blogContentsArray[i].link}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Content : </td>
//                       <td>
//                         <textarea
//                           onChange={(e) => onContentChange(e, i, "content")}
//                           value={blogContentsArray[i].content}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Code : </td>
//                       <td>
//                         <textarea
//                           onChange={(e) => onContentChange(e, i, "code")}
//                           value={blogContentsArray[i].code}
//                         />
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             );
//           })}
//           <button onClick={() => addMoreContent()}>Add More Content</button>
//         </div>
//         <button onClick={() => capturePost()}>CapturePost Click Twice</button>
//         <br />
//         <button onClick={() => editPost()}>Send Post</button>
//         <br />
//         <button onClick={() => deletePost()}>Delete Post</button>
//       </div>
//     </div>
//   );
// }
