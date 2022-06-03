import hljs from "highlight.js";
import highlightCss from "highlight.js/styles/atom-one-dark.css";
import * as React from "react";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import type { LinksFunction } from "remix";

type PropsType = {
  defaultValue?: string;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: highlightCss },
];

hljs.configure({
  // optionally configure hljs
  languages: ["javascript", "ruby", "python"],
});

function Quill({ defaultValue }: PropsType) {
  const [title, setTitle] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const [html, setHtml] = React.useState<any>();
  const { quill, quillRef } = useQuill({
    modules: {
      syntax: {
        highlight: (text: any) => {
          console.log(hljs.highlightAuto(text).value);
          return hljs.highlightAuto(text).value;
        },
      },
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],

        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        ["code-block"],
        ["block-quote"],
      ],
      clipboard: {
        matchVisual: false,
      },
    },
    formats: [
      "bold",
      "italic",
      "underline",
      "strike",
      "align",
      "list",
      "indent",
      "size",
      "header",
      "link",
      "image",
      "video",
      "color",
      "background",
      "code-block",
      "clean",
    ],
  });
  useEffect(() => {
    if (quill && defaultValue) {
      quill.on("text-change", () => {
        setHtml(quill.root.innerHTML);
      });
    }
  }, [defaultValue, quill]);

  const handleSubmit = () => {
    window
      .fetch("http://localhost:8080/post/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: title,
          email: email,
          body: html,
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div style={{ width: 800, height: 300, margin: "auto" }}>
      <div ref={quillRef} />
      <input
        type="text"
        className="border-2 border-sky-400 w-full my-2 py-2 px-2"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Enter title"
      />
      <input
        type="text"
        name="email"
        className="border-2 border-sky-400 w-full my-2 py-2 px-2"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter email"
      />
      <button
        className="bg-sky-600 rounded mt-6 py-2 px-4 text-white"
        onClick={handleSubmit}
      >
        Create Post
      </button>
    </div>
  );
}

export default Quill;
