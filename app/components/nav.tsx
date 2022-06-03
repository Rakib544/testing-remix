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
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notification ? (
            <span className="flex h-3 w-3 absolute -top-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-700"></span>
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default Nav;
