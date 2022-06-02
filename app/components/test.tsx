import * as React from "react";

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
  console.log(state);
  return <div>Hello this is test component</div>;
};

export default Test;
