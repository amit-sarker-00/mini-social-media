import { Avatar, Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const About = () => {
  const { user } = useContext(AuthContext);
  const [myInfo, setMyInfo] = useState("");
  const { name, email, photoURL } = myInfo;
  console.log(myInfo);
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyInfo(data));
  }, [user?.email]);

  return (
    <div className="max-w-sm mx-auto my-10 hover:border hover:border-blue-500 rounded-xl hover:shadow-2xl">
      <Card>
        <div className="flex justify-end px-4 pt-4">
          <h1 className="font-bold">Edit</h1>
        </div>
        <div className="flex flex-col items-center pb-10">
          {user?.photoURL ? (
            <img
              className="mb-3 h-28 w-28 rounded-full shadow-lg"
              src={photoURL}
              title={name}
              alt={name}
            />
          ) : (
            <Avatar className="h-28 w-28 border rounded-full" rounded={true} />
          )}

          <h5 className="mb-1 text-xl font-extrabold text-gray-900 dark:text-white">
            {name}
          </h5>
          <span className="text-sm text-black font-bold">E-mail: {email}</span>
          <p className="font-semibold text-sm">Dhaka,Bangladesh</p>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
