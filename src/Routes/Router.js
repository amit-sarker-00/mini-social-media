import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import About from "../Pages/About/About";
import UpdateUserInfo from "../Pages/About/UpdateUserInfo";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import NewPost from "../Pages/Home/NewPost/NewPost";
import Login from "../Pages/Login/Login";
import Media from "../Pages/Media/Media";
import PostDetails from "../Pages/Media/PostDetails";
import Message from "../Pages/Message/Message";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/home", element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/message", element: <Message></Message> },
      { path: "/update/:id", element: <UpdateUserInfo></UpdateUserInfo> },
      {
        path: "/newPost",
        element: (
          <PrivateRoute>
            <NewPost></NewPost>
          </PrivateRoute>
        ),
      },
      { path: "/media", element: <Media></Media> },
      {
        path: "/postdetails/:id",
        element: (
          <PrivateRoute>
            <PostDetails></PostDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About></About>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <ErrorPage></ErrorPage> },
]);
