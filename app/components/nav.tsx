import { Link } from "@remix-run/react";
import * as React from "react";
import { io } from "socket.io-client";

const Nav = () => {
  const [socket, setSocket] = React.useState<any>();
  const [notification, setNotification] = React.useState<string>("");
  React.useEffect(() => {
    const s = io("https://aqueous-island-70794.herokuapp.com/", {
      transports: ["websocket"],
    });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  socket?.off("new_post").on("new_post", (data: string) => {
    setNotification(data);
  });
  return (
    <div className="flex justify-between py-6 px-4 bg-gray-100 text-xl items-center relative">
      <Link to="/" className="font-bold">
        Remix
      </Link>
      <div className="flex items-center">
        <Link to="/create-post" className="mx-2">
          Create Post
        </Link>
        <Link to="/posts" className="mx-2">
          Forums
        </Link>
        <button className="mx-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <span className="flex h-3 w-3 absolute -top-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </button>
      </div>
      {notification ? (
        <div
          role="alert"
          className="absolute -bottom-6 right-0 bg-red-400 text-white px-2 py-1 rounded"
        >
          <small>"{notification}"</small>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Nav;
