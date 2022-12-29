import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const UpdateUserInfo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [update, setUpdate] = useState("");
  const params = useParams();
  const handelUpdateReview = (data) => {
    const update = {
      name: data.name,
      email: data.email,
      photoURL: data.photURL,
    };
    fetch(
      `https://mini-social-media-server.vercel.app/editAbout/${params?.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(update),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged === true) {
          toast.success("Updated Successfully");
          console.log(data);
          setUpdate(data);
          navigate("/about");
          reset();
        }
      });
  };

  return (
    <div className="bg-white rounded-md shadow-2xl py-12 w-96 mx-auto my-10">
      <form
        className=" flex flex-col gap-4 items-center justify-center "
        onSubmit={handleSubmit(handelUpdateReview)}
      >
        <input
          className="border bg-white text-black border-blue-700 p-2 w-80"
          {...register("name", { required: "Name is Required" })}
          placeholder="name"
        />
        <input
          defaultValue={user?.email}
          readOnly
          className="border bg-white text-black border-blue-700 p-2 w-80"
          {...register("email", { required: "Email is Required" })}
          placeholder="email"
        />
        <input
          className="border bg-white text-black border-blue-700 p-2 w-80"
          {...register("photoURL")}
          placeholder="photoURL"
        />

        <button className="btn rounded-md p-2 w-80  bg-blue-700 text-white font-bold hover:bg-blue-400">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserInfo;
