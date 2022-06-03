import highlightCss from "highlight.js/styles/atom-one-dark.css";
import quillCss from "quill/dist/quill.snow.css";
import type { LinksFunction } from "remix";
import { ClientOnly } from "remix-utils";
import Nav from "~/components/nav";
import Quill from "~/components/quill.client";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: quillCss },
  { rel: "stylesheet", href: highlightCss },
];

export default function Index() {
  return (
    <>
      <Nav />
      <div className="m-2">
        <ClientOnly fallback={<div style={{ width: 500, height: 300 }}></div>}>
          {() => <Quill defaultValue="Hello <b>Remix!</b>" />}
        </ClientOnly>
      </div>
    </>
  );
}
