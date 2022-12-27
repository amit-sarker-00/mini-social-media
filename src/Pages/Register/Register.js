import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const Registration = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const handelRegister = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User Registration Successfully Done!");
        savedUser(data.name, data.email, data.photoURL);
        reset();
      })
      .then((err) => console.error(err));
  };

  const handelLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Register Successfully!");
      })
      .catch((err) => console.error(err));
  };
  // post method for register user
  const savedUser = (name, email, photoURL) => {
    const user = { name, email, photoURL };
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="bg-white rounded-md shadow-2xl py-12 w-96 mx-auto my-10">
      <form
        className=" flex flex-col gap-4 items-center justify-center "
        onSubmit={handleSubmit(handelRegister)}
      >
        <input
          className="border bg-white text-gray-400 border-blue-700 p-2 w-80"
          {...register("name", { required: "Name is Required" })}
          placeholder="name"
        />
        <input
          className="border bg-white text-gray-400 border-blue-700 p-2 w-80"
          {...register("email", { required: "Email is Required" })}
          placeholder="email"
        />
        <input
          className="border bg-white text-gray-400 border-blue-700 p-2 w-80"
          {...register("photoURL", { required: "photoURL is Required" })}
          placeholder="photoURL"
        />
        <input
          className="border bg-white text-gray-400 border-blue-700 p-2 w-80 "
          {...register("phone", { required: "Number is Required" })}
          placeholder="phone number"
        />
        <input
          className="border bg-white text-gray-400 border-blue-700 p-2 w-80"
          {...register("password", { required: "Password is Required" })}
          placeholder="password"
        />

        <button className="btn rounded-md p-2 w-80  bg-blue-700 text-white font-bold hover:bg-blue-400">
          Register
        </button>
        <p className="text-gray-500 text-sm font-bold">
          Already Have an Account ?
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </form>
      <div className="divider text-gray-600">OR</div>
      <div className="text-center">
        <button
          onClick={handelLogin}
          className="btn rounded-md p-2 w-80 bg-blue-700 text-white font-bold hover:bg-blue-400"
        >
          Register With Google
        </button>
      </div>
    </div>
  );
};

export default Registration;
