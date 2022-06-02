import * as React from "react";
import { io } from "socket.io-client";
interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Test = () => {
  const [state, setState] = React.useState<User[] | null>(null);

  React.useEffect(() => {
    const getPosts = async () => {
      const res = await window.fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const posts: User[] = await res.json();
      setState(posts);
    };

    getPosts();
  }, []);

  const [socket, setSocket] = React.useState<any>();
  React.useEffect(() => {
    const s = io("http://localhost:8080", { transports: ["websocket"] });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  console.log(socket);

  socket?.off("new_message").on("new_message", (data: any) => {
    console.log(data);
  });

  const handleClick = () => {
    window.fetch("http://localhost:8080/message/send", {
      method: "POST",
      body: JSON.stringify("jgnbkjgfn"),
    });
  };

  return (
    <div>
      Hello this is test component
      <button onClick={handleClick}>Load</button>
    </div>
  );
};

export default Test;
