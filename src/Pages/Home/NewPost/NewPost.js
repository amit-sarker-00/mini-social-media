import React, { useContext, useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import "./NewPost.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const NewPost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [myInfo, setMyInfo] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyInfo(data));
  }, [user?.email]);

  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const handelCreatePost = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData);
        if (imageData.success) {
          const post = {
            image: imageData.data.url,
            details: data.textarea,
            email: user?.email,
            name: myInfo?.name,
            userImage: myInfo.photoURL,
          };
          fetch("http://localhost:5000/createPost", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(post),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              navigate("/media");
            });
        }
      });
  };
  return (
    <div className="border my-5 w-64 sm:w-96 mx-auto shadow-2xl">
      <div className="mx-8 font-bold my-4">
        <h1>Create New Post</h1>
      </div>
      <form
        className=" flex flex-col gap-4 items-center justify-center my-8"
        onSubmit={handleSubmit(handelCreatePost)}
      >
        <textarea
          className="border bg-white  border-blue-700 p-6 w-auto md:w-80"
          {...register("textarea")}
          placeholder="Write Something here..."
        />

        <div className="mx-5">
          <input
            type="file"
            className="border bg-white border-blue-700 p-2 w-52 md:w-full "
            {...register("image", { required: "image is Required" })}
            placeholder="image"
          />
        </div>

        <div className="mx-5">
          <button className="btn rounded-md p-2 w-52 md:w-full  bg-blue-700 text-white font-bold hover:bg-blue-400">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;

/* <div className="md:mx-5 mx-2 text-gray-500 font-semibold text-sm">
<ul className="flex items-center gap-2 lg:gap-10 justify-center ">
  <li className="flex items-center gap-1">
    <p>
      <HiOutlineVideoCamera className="md:w-5 w-3 h-5"></HiOutlineVideoCamera>
    </p>
    <p>Video</p>
  </li>
  <li className="flex items-center gap-1">
    <p>
      <FaUserFriends className="md:w-5 w-3 h-5"></FaUserFriends>
    </p>
    <p>Tag Friends</p>
  </li>
  <li>
    <button className="py-1 sm:px-3 px-1 bg-blue-700 text-white rounded-sm hover:bg-blue-500">
      Post
    </button>
  </li>
</ul>
</div> */
