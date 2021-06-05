import DOMPurify from "dompurify";

export const createHTML = (html: string) => {
  return {
    __html: process.browser ? DOMPurify.sanitize(html) : html,
  };
};

export const createHTMLExcerpt = (html: string) => {
  const sanitizedHTML = process.browser
    ? DOMPurify.sanitize(html).substring(0, 300)
    : html.substring(0, 300);

  return {
    __html: sanitizedHTML,
  };
};
 