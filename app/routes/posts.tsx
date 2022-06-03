import type { LoaderFunction } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import Nav from "~/components/nav";

export const loader: LoaderFunction = async () => {
  const posts = await fetch("https://aqueous-island-70794.herokuapp.com/post");
  return json(await posts.json());
};

const Posts = () => {
  const { post } = useLoaderData();
  return (
    <>
      {" "}
      <Nav />
      <div>
        {post.map((p: any) => (
          <div key={p._id} className="my-4 p-4 bg-gray-100">
            <h1>{p.title}</h1>
            <p>{p.email}</p>
            <div dangerouslySetInnerHTML={{ __html: p.body }}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
