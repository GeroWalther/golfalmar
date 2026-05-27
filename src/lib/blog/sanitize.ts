import sanitizeHtml from "sanitize-html";

// Allow only the HTML produced by our Tiptap toolbar — no scripts, no
// inline event handlers, no embedded styles. This is the contract between
// the rich-text editor and what we trust to render on a public page.
//
// We use sanitize-html (htmlparser2-based) rather than isomorphic-dompurify
// because the latter pulls in jsdom, which has had ESM/CJS interop breakage
// on Vercel serverless cold-starts (html-encoding-sniffer / @exodus/bytes).
const ALLOWED_TAGS = [
  "p", "br", "hr",
  "h1", "h2", "h3", "h4",
  "strong", "em", "u", "s", "code",
  "blockquote",
  "ul", "ol", "li",
  "a", "img",
];

export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    // Strip the tag AND its inner text (instead of leaving naked text behind).
    nonTextTags: ["style", "script", "textarea", "noscript"],
  });
}
