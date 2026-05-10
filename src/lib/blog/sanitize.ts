import DOMPurify from "isomorphic-dompurify";

// Allow only the HTML produced by our Tiptap toolbar — no scripts, no
// inline event handlers, no embedded styles. This is the contract between
// the rich-text editor and what we trust to render on a public page.
const ALLOWED_TAGS = [
  "p", "br", "hr",
  "h1", "h2", "h3", "h4",
  "strong", "em", "u", "s", "code",
  "blockquote",
  "ul", "ol", "li",
  "a", "img",
];
const ALLOWED_ATTR = ["href", "src", "alt", "title", "rel", "target"];

export function sanitizeBlogHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style"],
    FORBID_ATTR: ["onerror", "onclick", "onload", "style"],
  });
}
